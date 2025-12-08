import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Product, CartItem, User } from '../types';

// Mock Data
const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Ultimate SaaS UI Kit',
    description: 'A complete React & Tailwind UI kit for building modern SaaS applications instantly.',
    price: 49.00,
    category: 'Templates',
    image: 'https://picsum.photos/800/600?random=1',
    rating: 4.8,
    reviews: 124,
    features: ['200+ Components', 'Dark Mode Support', 'Figma Files Included']
  },
  {
    id: '2',
    title: 'Modern React Patterns eBook',
    description: 'Master advanced React patterns with this comprehensive guide for senior developers.',
    price: 29.00,
    category: 'Ebooks',
    image: 'https://picsum.photos/800/600?random=2',
    rating: 4.9,
    reviews: 89,
    features: ['PDF & EPUB', 'Source Code Examples', 'Lifetime Updates']
  },
  {
    id: '3',
    title: 'Lofi Focus Music Pack',
    description: 'Copyright-free lofi beats for creators, streamers, and developers to focus.',
    price: 15.00,
    category: 'Music',
    image: 'https://picsum.photos/800/600?random=3',
    rating: 4.7,
    reviews: 210,
    features: ['30 Tracks', 'High Quality WAV', 'Royalty Free']
  },
  {
    id: '4',
    title: 'Finance Dashboard Template',
    description: 'Clean and intuitive dashboard design for fintech applications.',
    price: 39.00,
    category: 'Templates',
    image: 'https://picsum.photos/800/600?random=4',
    rating: 4.5,
    reviews: 56,
    features: ['Responsive Layout', 'Chart.js Integration', 'Clean Code']
  },
  {
    id: '5',
    title: 'Full-Stack Masterclass',
    description: 'Zero to Hero video course covering Node.js, React, and PostgreSQL.',
    price: 99.00,
    category: 'Courses',
    image: 'https://picsum.photos/800/600?random=5',
    rating: 5.0,
    reviews: 430,
    features: ['40 Hours Video', 'Private Discord', 'Certificate']
  },
  {
    id: '6',
    title: 'Minimalist Icon Pack',
    description: '2000+ vector icons designed for high-end web applications.',
    price: 19.00,
    category: 'Assets',
    image: 'https://picsum.photos/800/600?random=6',
    rating: 4.6,
    reviews: 112,
    features: ['SVG & PNG', 'Figma Plugin', 'Pixel Perfect']
  }
];

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  user: User | null;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  login: (email: string, role?: 'admin' | 'customer') => void;
  logout: () => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  checkout: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => setCart([]);

  const login = (email: string, role: 'admin' | 'customer' = 'customer') => {
    setUser({
      id: Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0],
      email,
      role,
      purchasedProducts: []
    });
  };

  const logout = () => {
    setUser(null);
    setCart([]);
  };

  const addProduct = (product: Product) => {
    setProducts(prev => [product, ...prev]);
  };

  const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedProduct } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const checkout = () => {
    if (!user) return;
    const newPurchases = cart.map(item => item.id);
    setUser(prev => prev ? { ...prev, purchasedProducts: [...prev.purchasedProducts, ...newPurchases] } : null);
    clearCart();
  };

  return (
    <StoreContext.Provider value={{
      products,
      cart,
      user,
      addToCart,
      removeFromCart,
      clearCart,
      login,
      logout,
      addProduct,
      updateProduct,
      deleteProduct,
      checkout
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};