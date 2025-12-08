import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Check, Star, ArrowLeft, ShoppingCart, ShieldCheck, RefreshCcw } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import Button from '../components/ui/Button';
import { motion } from 'framer-motion';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart } = useStore();
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <Link to="/shop">
          <Button>Back to Shop</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/shop" className="inline-flex items-center text-gray-500 hover:text-primary mb-8 transition-colors">
          <ArrowLeft size={18} className="mr-2" /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image Side */}
          <motion.div
            {...({
              initial: { opacity: 0, x: -50 },
              animate: { opacity: 1, x: 0 },
              transition: { duration: 0.6 }
            } as any)}
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-gray-100 aspect-[4/3]">
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-6">
               {[1, 2, 3].map((i) => (
                 <div key={i} className="rounded-lg overflow-hidden h-24 bg-gray-100 cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
                    <img src={`https://picsum.photos/400/300?random=${parseInt(product.id) + i}`} className="w-full h-full object-cover" alt="" />
                 </div>
               ))}
            </div>
          </motion.div>

          {/* Info Side */}
          <motion.div
            {...({
              initial: { opacity: 0, x: 50 },
              animate: { opacity: 1, x: 0 },
              transition: { duration: 0.6, delay: 0.2 }
            } as any)}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-indigo-50 text-primary text-sm font-bold rounded-full">{product.category}</span>
              <div className="flex items-center text-yellow-400">
                <Star size={16} className="fill-current" />
                <span className="text-gray-900 font-bold ml-1 text-sm">{product.rating}</span>
                <span className="text-gray-400 ml-1 text-sm">({product.reviews} reviews)</span>
              </div>
            </div>

            <h1 className="text-4xl font-bold text-secondary mb-4">{product.title}</h1>
            <p className="text-lg text-gray-500 leading-relaxed mb-8">{product.description}</p>

            <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">What's included:</h3>
              <ul className="space-y-3">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3 text-green-600">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    {feature}
                  </li>
                ))}
                <li className="flex items-center text-gray-600">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3 text-green-600">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  Lifetime Updates
                </li>
              </ul>
            </div>

            <div className="flex items-center justify-between py-6 border-t border-gray-100 mb-8">
              <div>
                <span className="text-sm text-gray-400 block">Total Price</span>
                <span className="text-4xl font-bold text-primary">${product.price.toFixed(2)}</span>
              </div>
              <Button size="lg" onClick={() => addToCart(product)} className="px-8">
                <ShoppingCart className="mr-2" size={20} /> Add to Cart
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <ShieldCheck className="text-primary" /> Secure Payment
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <RefreshCcw className="text-primary" /> 30-Day Guarantee
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;