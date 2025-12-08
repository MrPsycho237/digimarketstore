import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Instagram, Github, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
             <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg">
                D
              </div>
              <span className="font-bold text-xl tracking-tight text-secondary">DigiMarket</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              The premier marketplace for high-quality digital assets. Elevate your projects with our curated collection.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-secondary mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link to="/shop?cat=Templates" className="hover:text-primary transition-colors">Templates</Link></li>
              <li><Link to="/shop?cat=Ebooks" className="hover:text-primary transition-colors">E-Books</Link></li>
              <li><Link to="/shop?cat=Courses" className="hover:text-primary transition-colors">Courses</Link></li>
              <li><Link to="/shop?cat=Music" className="hover:text-primary transition-colors">Audio</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-secondary mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">License</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-secondary mb-4">Stay Connected</h4>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
                <Github size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© 2024 DigiMarket Inc. All rights reserved.</p>
          <p className="flex items-center gap-1 mt-2 md:mt-0">
            Made with <Heart size={14} className="text-red-500 fill-red-500" /> by Senior Dev
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
