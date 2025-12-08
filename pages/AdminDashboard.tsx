import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Plus, Trash2, Edit2, Package, Search, Users, 
  ShoppingBag, BarChart3, X, Check, UploadCloud, ChevronRight 
} from 'lucide-react';
import Button from '../components/ui/Button';
import { Navigate } from 'react-router-dom';
import { Product } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data for other tabs
const MOCK_ORDERS = [
  { id: '#ORD-7721', customer: 'alex@design.co', date: 'Oct 24, 2024', total: '$128.00', status: 'Completed', items: 3 },
  { id: '#ORD-7722', customer: 'sarah@tech.io', date: 'Oct 23, 2024', total: '$49.00', status: 'Completed', items: 1 },
  { id: '#ORD-7723', customer: 'mike@studio.net', date: 'Oct 23, 2024', total: '$215.00', status: 'Refunded', items: 4 },
  { id: '#ORD-7724', customer: 'lisa@freelance.com', date: 'Oct 22, 2024', total: '$29.00', status: 'Completed', items: 1 },
];

const MOCK_USERS = [
  { id: 'usr_1', name: 'Alex Johnson', email: 'alex@design.co', joined: 'Jan 12, 2024', spent: '$450.00' },
  { id: 'usr_2', name: 'Sarah Smith', email: 'sarah@tech.io', joined: 'Feb 23, 2024', spent: '$120.00' },
  { id: 'usr_3', name: 'Mike Brown', email: 'mike@studio.net', joined: 'Mar 10, 2024', spent: '$890.00' },
  { id: 'usr_4', name: 'Lisa Wilson', email: 'lisa@freelance.com', joined: 'Apr 05, 2024', spent: '$50.00' },
];

const AdminDashboard: React.FC = () => {
  const { user, products, addProduct, updateProduct, deleteProduct } = useStore();
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'users'>('products');
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Product>>({
    title: '',
    price: 0,
    category: 'Templates',
    description: '',
    image: 'https://picsum.photos/800/600',
    features: ['']
  });

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  const resetForm = () => {
    setFormData({
      title: '',
      price: 0,
      category: 'Templates',
      description: '',
      image: 'https://picsum.photos/800/600',
      features: ['']
    });
    setEditId(null);
    setIsEditing(false);
    setShowForm(false);
  };

  const handleEdit = (product: Product) => {
    setFormData(product);
    setEditId(product.id);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...(formData.features || [])];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...(formData.features || []), ''] });
  };

  const removeFeature = (index: number) => {
    const newFeatures = [...(formData.features || [])];
    newFeatures.splice(index, 1);
    setFormData({ ...formData, features: newFeatures });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.price) return;

    if (isEditing && editId) {
      updateProduct(editId, formData);
    } else {
      const product: Product = {
        id: Math.random().toString(36).substr(2, 9),
        title: formData.title!,
        description: formData.description || '',
        price: Number(formData.price),
        category: formData.category || 'Assets',
        image: formData.image || 'https://picsum.photos/800/600',
        rating: 0, // New products start with 0
        reviews: 0,
        features: formData.features?.filter(f => f.trim() !== '') || []
      };
      addProduct(product);
    }
    resetForm();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-100 hidden md:block fixed h-full z-10">
        <div className="p-6">
          <h2 className="text-xl font-bold text-secondary flex items-center gap-2">
            <div className="w-8 h-8 bg-secondary text-white rounded-lg flex items-center justify-center">A</div>
            Admin
          </h2>
        </div>
        <nav className="mt-4 px-4 space-y-2">
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'products' ? 'bg-primary/10 text-primary font-medium' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <Package size={20} /> Products
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'orders' ? 'bg-primary/10 text-primary font-medium' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <ShoppingBag size={20} /> Orders
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'users' ? 'bg-primary/10 text-primary font-medium' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <Users size={20} /> Customers
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 p-8">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
              <h3 className="text-2xl font-bold text-secondary">$12,450.00</h3>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600">
              <BarChart3 size={24} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Active Products</p>
              <h3 className="text-2xl font-bold text-secondary">{products.length}</h3>
            </div>
            <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-primary">
              <Package size={24} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Customers</p>
              <h3 className="text-2xl font-bold text-secondary">1,204</h3>
            </div>
            <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-orange-600">
              <Users size={24} />
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-bold text-secondary capitalize">{activeTab} Management</h1>
          {activeTab === 'products' && (
            <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
              <Plus size={18} /> Add Product
            </Button>
          )}
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <>
            <AnimatePresence>
              {showForm && (
                <motion.div 
                  {...({
                    initial: { opacity: 0, height: 0 },
                    animate: { opacity: 1, height: 'auto' },
                    exit: { opacity: 0, height: 0 }
                  } as any)}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8"
                >
                  <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h3 className="font-bold text-lg text-secondary">{isEditing ? 'Edit Product' : 'Create New Product'}</h3>
                    <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                      <X size={20} />
                    </button>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Left Column: Details */}
                      <div className="lg:col-span-2 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Product Title</label>
                            <input
                              type="text"
                              required
                              value={formData.title}
                              onChange={e => setFormData({...formData, title: e.target.value})}
                              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                              placeholder="e.g. Ultimate UI Kit"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                            <input
                              type="number"
                              required
                              step="0.01"
                              value={formData.price}
                              onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                          <textarea
                            required
                            rows={4}
                            value={formData.description}
                            onChange={e => setFormData({...formData, description: e.target.value})}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                            placeholder="Describe your product..."
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                          <div className="space-y-3">
                            {formData.features?.map((feature, index) => (
                              <div key={index} className="flex gap-2">
                                <input
                                  type="text"
                                  value={feature}
                                  onChange={e => handleFeatureChange(index, e.target.value)}
                                  className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                  placeholder="Feature description"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeFeature(index)}
                                  className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={addFeature}
                              className="text-sm text-primary font-medium hover:text-indigo-700 flex items-center gap-1"
                            >
                              <Plus size={16} /> Add Feature
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Right Column: Media & Meta */}
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                          <select
                            value={formData.category}
                            onChange={e => setFormData({...formData, category: e.target.value})}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-white"
                          >
                            <option value="Templates">Templates</option>
                            <option value="Ebooks">Ebooks</option>
                            <option value="Courses">Courses</option>
                            <option value="Music">Music</option>
                            <option value="Assets">Assets</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image URL</label>
                          <div className="mb-3">
                            <input
                              type="text"
                              value={formData.image}
                              onChange={e => setFormData({...formData, image: e.target.value})}
                              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                              placeholder="https://..."
                            />
                          </div>
                          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200 relative group">
                            {formData.image ? (
                              <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                <UploadCloud size={32} className="mb-2" />
                                <span className="text-sm">Image Preview</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="pt-4">
                          <Button fullWidth type="submit" size="lg">
                            {isEditing ? 'Update Product' : 'Create Product'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Products Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
                      <th className="px-6 py-4 font-semibold">Product</th>
                      <th className="px-6 py-4 font-semibold">Category</th>
                      <th className="px-6 py-4 font-semibold">Price</th>
                      <th className="px-6 py-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                              <img src={product.image} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="font-medium text-secondary">{product.title}</p>
                              <p className="text-xs text-gray-400">ID: {product.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                            {product.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-medium text-secondary">
                          ${product.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => handleEdit(product)}
                              className="p-2 text-gray-400 hover:text-primary hover:bg-indigo-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button 
                              onClick={() => deleteProduct(product.id)}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold">Order ID</th>
                  <th className="px-6 py-4 font-semibold">Customer</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold">Total</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {MOCK_ORDERS.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-primary">{order.id}</td>
                    <td className="px-6 py-4 text-gray-600">{order.customer}</td>
                    <td className="px-6 py-4 text-gray-500 text-sm">{order.date}</td>
                    <td className="px-6 py-4 font-medium text-secondary">{order.total}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-sm text-gray-500 hover:text-primary font-medium flex items-center justify-end gap-1 w-full">
                        Details <ChevronRight size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold">User</th>
                  <th className="px-6 py-4 font-semibold">Email</th>
                  <th className="px-6 py-4 font-semibold">Joined</th>
                  <th className="px-6 py-4 font-semibold">Total Spent</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {MOCK_USERS.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-secondary">{user.name}</td>
                    <td className="px-6 py-4 text-gray-600">{user.email}</td>
                    <td className="px-6 py-4 text-gray-500 text-sm">{user.joined}</td>
                    <td className="px-6 py-4 font-medium text-green-600">{user.spent}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;