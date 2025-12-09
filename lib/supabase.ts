import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          name: string;
          phone_number: string | null;
          role: 'admin' | 'customer';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name: string;
          phone_number?: string | null;
          role?: 'admin' | 'customer';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          phone_number?: string | null;
          role?: 'admin' | 'customer';
          created_at?: string;
          updated_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          title: string;
          description: string;
          price: number;
          category: string;
          image: string;
          rating: number;
          reviews: number;
          features: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string;
          price: number;
          category: string;
          image?: string;
          rating?: number;
          reviews?: number;
          features?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          price?: number;
          category?: string;
          image?: string;
          rating?: number;
          reviews?: number;
          features?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
      cart_items: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          quantity: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          product_id: string;
          quantity?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          product_id?: string;
          quantity?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          total: number;
          subtotal: number;
          tax: number;
          status: 'pending' | 'completed' | 'refunded';
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          total: number;
          subtotal: number;
          tax: number;
          status?: 'pending' | 'completed' | 'refunded';
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          total?: number;
          subtotal?: number;
          tax?: number;
          status?: 'pending' | 'completed' | 'refunded';
          created_at?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          quantity: number;
          price: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id: string;
          quantity?: number;
          price: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string;
          quantity?: number;
          price?: number;
          created_at?: string;
        };
      };
      purchased_products: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          order_id: string;
          purchased_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          product_id: string;
          order_id: string;
          purchased_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          product_id?: string;
          order_id?: string;
          purchased_at?: string;
        };
      };
      flutterwave_payments: {
        Row: {
          id: string;
          profile_id: string;
          amount: number;
          currency: string;
          tx_ref: string;
          status: 'pending' | 'completed' | 'failed';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          amount: number;
          currency?: string;
          tx_ref: string;
          status?: 'pending' | 'completed' | 'failed';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          profile_id?: string;
          amount?: number;
          currency?: string;
          tx_ref?: string;
          status?: 'pending' | 'completed' | 'failed';
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
