import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, LogOut, Package } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const { cart, user, logout } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:scale-105 transition-transform duration-200">
              D
            </div>
            <span className="font-bold text-xl tracking-tight text-secondary">DigiMarket</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-primary font-medium transition-colors">Home</Link>
            <Link to="/shop" className="text-gray-600 hover:text-primary font-medium transition-colors">Shop</Link>
            
            {user?.role === 'admin' && (
              <Link to="/admin" className="text-gray-600 hover:text-primary font-medium transition-colors">Admin</Link>
            )}
            
            {user && user.role !== 'admin' && (
               <Link to="/dashboard" className="text-gray-600 hover:text-primary font-medium transition-colors">Library</Link>
            )}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/cart" className="relative text-gray-600 hover:text-primary transition-colors">
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                  {totalItems}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">Hi, {user.name}</span>
                <button 
                  onClick={handleLogout}
                  className="text-gray-500 hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="px-5 py-2 bg-secondary text-white rounded-full font-medium hover:bg-gray-800 transition-all hover:shadow-lg text-sm"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
             <Link to="/cart" className="relative text-gray-600 hover:text-primary transition-colors mr-4">
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                  {totalItems}
                </span>
              )}
            </Link>
            <button onClick={toggleMenu} className="text-gray-600 hover:text-primary">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            {...({
              initial: { height: 0, opacity: 0 },
              animate: { height: 'auto', opacity: 1 },
              exit: { height: 0, opacity: 0 }
            } as any)}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-4">
              <Link to="/" onClick={toggleMenu} className="block text-gray-600 font-medium">Home</Link>
              <Link to="/shop" onClick={toggleMenu} className="block text-gray-600 font-medium">Shop</Link>
              {user?.role === 'admin' && (
                 <Link to="/admin" onClick={toggleMenu} className="block text-gray-600 font-medium">Admin Dashboard</Link>
              )}
               {user && user.role !== 'admin' && (
                 <Link to="/dashboard" onClick={toggleMenu} className="block text-gray-600 font-medium">My Library</Link>
              )}
              <div className="pt-4 border-t border-gray-100">
                {user ? (
                  <button onClick={handleLogout} className="flex items-center text-red-500 font-medium w-full">
                    <LogOut size={18} className="mr-2" /> Sign Out
                  </button>
                ) : (
                  <Link to="/login" onClick={toggleMenu} className="block text-primary font-medium">Sign In</Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;