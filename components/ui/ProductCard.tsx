import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useStore();

  return (
    <motion.div 
      {...({
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        whileHover: { y: -8 },
        transition: { duration: 0.3 }
      } as any)}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-secondary uppercase tracking-wider">
          {product.category}
        </div>
        <button 
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
          className="absolute bottom-3 right-3 bg-primary text-white p-2.5 rounded-full shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-indigo-700"
        >
          <ShoppingCart size={18} />
        </button>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/product/${product.id}`} className="block">
            <h3 className="font-bold text-lg text-secondary group-hover:text-primary transition-colors line-clamp-1">
              {product.title}
            </h3>
          </Link>
        </div>
        
        <div className="flex items-center space-x-1 mb-3">
          <Star size={14} className="fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium text-gray-700">{product.rating}</span>
          <span className="text-sm text-gray-400">({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-primary">${product.price.toFixed(2)}</span>
          <Link 
            to={`/product/${product.id}`}
            className="text-sm font-medium text-gray-500 hover:text-secondary transition-colors"
          >
            View Details →
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;