import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, Lock } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import Button from '../components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

const Cart: React.FC = () => {
  const { cart, removeFromCart, checkout, user } = useStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleCheckout = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setIsProcessing(true);
    try {
      await checkout();
      setIsProcessing(false);
      alert('Order completed successfully!');
      navigate('/shop');
    } catch (error) {
      setIsProcessing(false);
      alert('Checkout failed. Please try again.');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={48} className="text-gray-300" />
        </div>
        <h2 className="text-2xl font-bold text-secondary mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 max-w-sm">Looks like you haven't added any digital assets to your cart yet.</p>
        <Link to="/shop">
          <Button size="lg">Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-secondary mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  {...({
                    layout: true,
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    exit: { opacity: 0, x: -100 }
                  } as any)}
                  className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4"
                >
                  <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-secondary">{item.title}</h3>
                        <p className="text-sm text-gray-500">{item.category}</p>
                      </div>
                      <span className="font-bold text-primary">${item.price.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between items-end mt-2">
                       <span className="text-sm text-gray-400">Qty: {item.quantity}</span>
                       <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-full"
                       >
                         <Trash2 size={16} />
                       </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <h3 className="text-lg font-bold text-secondary mb-6">Order Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-lg text-secondary">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Button 
                fullWidth 
                size="lg" 
                onClick={handleCheckout}
                disabled={isProcessing}
                className="mb-4"
              >
                {isProcessing ? 'Processing...' : (
                  <span className="flex items-center justify-center">
                    Checkout <ArrowRight size={18} className="ml-2" />
                  </span>
                )}
              </Button>
              
              <div className="flex items-center justify-center text-xs text-gray-400 gap-2">
                <Lock size={12} /> Secure 256-bit SSL Encrypted Payment
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;