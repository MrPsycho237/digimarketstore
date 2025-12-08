import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-indigo-600 shadow-lg hover:shadow-primary/30 focus:ring-primary",
    secondary: "bg-secondary text-white hover:bg-gray-800 shadow-lg hover:shadow-gray-900/30 focus:ring-secondary",
    outline: "border-2 border-gray-200 text-gray-700 hover:border-primary hover:text-primary bg-transparent focus:ring-gray-200",
    ghost: "text-gray-600 hover:bg-gray-100 hover:text-primary focus:ring-gray-200"
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-6 py-2.5",
    lg: "text-base px-8 py-3.5"
  };

  return (
    <motion.button
      {...({
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.98 }
      } as any)}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;