import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Product, CartItem, User } from '../types';
import { supabase } from '../lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  user: User | null;
  loading: boolean;
  addToCart: (product: Product) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, role?: 'admin' | 'customer') => Promise<void>;
  logout: () => Promise<void>;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  checkout: () => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading products:', error);
      return;
    }

    if (data) {
      setProducts(data as Product[]);
    }
  };

  const loadCart = async (userId: string) => {
    const { data, error } = await supabase
      .from('cart_items')
      .select(`
        id,
        quantity,
        product_id,
        products (*)
      `)
      .eq('user_id', userId);

    if (error) {
      console.error('Error loading cart:', error);
      return;
    }

    if (data) {
      const cartItems: CartItem[] = data.map((item: any) => ({
        ...item.products,
        quantity: item.quantity
      }));
      setCart(cartItems);
    }
  };

  const loadUserProfile = async (authUser: SupabaseUser) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authUser.id)
      .maybeSingle();

    if (error) {
      console.error('Error loading profile:', error);
      return;
    }

    if (data) {
      const { data: purchases } = await supabase
        .from('purchased_products')
        .select('product_id')
        .eq('user_id', authUser.id);

      setUser({
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role,
        purchasedProducts: purchases?.map(p => p.product_id) || []
      });

      await loadCart(authUser.id);
    }
  };

  useEffect(() => {
    loadProducts();

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        loadUserProfile(session.user);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        loadUserProfile(session.user);
      } else {
        setUser(null);
        setCart([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const addToCart = async (product: Product) => {
    if (!user) {
      alert('Please sign in to add items to cart');
      return;
    }

    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity: existingItem.quantity + 1 })
        .eq('user_id', user.id)
        .eq('product_id', product.id);

      if (error) {
        console.error('Error updating cart:', error);
        return;
      }

      setCart(prev =>
        prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      const { error } = await supabase
        .from('cart_items')
        .insert({
          user_id: user.id,
          product_id: product.id,
          quantity: 1
        });

      if (error) {
        console.error('Error adding to cart:', error);
        return;
      }

      setCart(prev => [...prev, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', user.id)
      .eq('product_id', productId);

    if (error) {
      console.error('Error removing from cart:', error);
      return;
    }

    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = async () => {
    if (!user) return;

    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', user.id);

    if (error) {
      console.error('Error clearing cart:', error);
      return;
    }

    setCart([]);
  };

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      throw new Error(error.message);
    }
  };

  const signup = async (email: string, password: string, name: string, role: 'admin' | 'customer' = 'customer') => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role
        }
      }
    });

    if (error) {
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error);
    }
  };

  const addProduct = async (product: Omit<Product, 'id'>) => {
    const { error } = await supabase
      .from('products')
      .insert({
        title: product.title,
        description: product.description,
        price: product.price,
        category: product.category,
        image: product.image,
        rating: product.rating || 0,
        reviews: product.reviews || 0,
        features: product.features || []
      });

    if (error) {
      console.error('Error adding product:', error);
      throw error;
    }

    await loadProducts();
  };

  const updateProduct = async (id: string, product: Partial<Product>) => {
    const { error } = await supabase
      .from('products')
      .update(product)
      .eq('id', id);

    if (error) {
      console.error('Error updating product:', error);
      throw error;
    }

    await loadProducts();
  };

  const deleteProduct = async (id: string) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting product:', error);
      throw error;
    }

    await loadProducts();
  };

  const checkout = async () => {
    if (!user || cart.length === 0) return;

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        total,
        subtotal,
        tax,
        status: 'completed'
      })
      .select()
      .single();

    if (orderError) {
      console.error('Error creating order:', orderError);
      throw orderError;
    }

    const orderItems = cart.map(item => ({
      order_id: order.id,
      product_id: item.id,
      quantity: item.quantity,
      price: item.price
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      console.error('Error adding order items:', itemsError);
      throw itemsError;
    }

    const purchases = cart.map(item => ({
      user_id: user.id,
      product_id: item.id,
      order_id: order.id
    }));

    const { error: purchasesError } = await supabase
      .from('purchased_products')
      .insert(purchases);

    if (purchasesError) {
      console.error('Error recording purchases:', purchasesError);
    }

    await clearCart();

    const purchasedIds = cart.map(item => item.id);
    setUser(prev => prev ? {
      ...prev,
      purchasedProducts: [...prev.purchasedProducts, ...purchasedIds]
    } : null);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        user,
        loading,
        addToCart,
        removeFromCart,
        clearCart,
        login,
        signup,
        logout,
        addProduct,
        updateProduct,
        deleteProduct,
        checkout
      }}
    >
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