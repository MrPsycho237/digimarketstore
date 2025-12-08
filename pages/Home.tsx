import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Globe, Layers } from 'lucide-react';
import Button from '../components/ui/Button';
import AnimatedSection from '../components/ui/AnimatedSection';
import ProductCard from '../components/ui/ProductCard';
import { useStore } from '../context/StoreContext';

const Home: React.FC = () => {
  const { products } = useStore();
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-40 bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.4] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            {...({
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.8 }
            } as any)}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-indigo-50 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              The Digital Marketplace
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-secondary mb-8">
              Discover Premium <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Digital Assets
              </span>
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
              High-quality resources for creators. E-books, templates, courses, and UI kits crafted by industry professionals.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/shop">
                <Button size="lg">Explore Products</Button>
              </Link>
              <Link to="/shop">
                <Button variant="outline" size="lg">Sell Your Work</Button>
              </Link>
            </div>
          </motion.div>

          {/* Hero Image / Graphic */}
          <motion.div
            {...({
              initial: { opacity: 0, y: 50 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 1, delay: 0.2 }
            } as any)}
            className="mt-16 md:mt-24 relative"
          >
            <div className="relative mx-auto max-w-5xl rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl lg:p-4">
              <div className="bg-white rounded-lg shadow-2xl overflow-hidden aspect-[16/9]">
                <img 
                  src="https://picsum.photos/1920/1080?random=10" 
                  alt="App Dashboard" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedSection delay={0.1}>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-primary mb-6">
                  <Zap size={24} />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-3">Instant Delivery</h3>
                <p className="text-gray-500">Get access to your files immediately after purchase. No waiting times, just pure creation.</p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2}>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full">
                <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center text-accent mb-6">
                  <Shield size={24} />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-3">Secure Payments</h3>
                <p className="text-gray-500">Processed securely. We value your privacy and security above everything else.</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                  <Globe size={24} />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-3">Global Community</h3>
                <p className="text-gray-500">Join thousands of creators buying and selling high-quality digital assets worldwide.</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-secondary mb-4">Trending Now</h2>
              <p className="text-gray-500">The most popular assets this week.</p>
            </div>
            <Link to="/shop" className="text-primary font-medium flex items-center hover:underline">
              View all <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, idx) => (
              <AnimatedSection key={product.id} delay={idx * 0.1}>
                <ProductCard product={product} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-secondary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 rounded-l-full transform translate-x-1/3 blur-3xl"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to start creating?</h2>
          <p className="text-xl text-gray-400 mb-10">Join thousands of developers and designers who trust DigiMarket.</p>
          <Link to="/shop">
             <Button variant="primary" size="lg" className="bg-white text-secondary hover:bg-gray-100 hover:text-primary">
               Browse Marketplace
             </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;