import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Plus, Trash2, Edit2, X, UploadCloud, Search, Image as ImageIcon } from 'lucide-react';
import Button from '../../components/ui/Button';
import { Product } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminProducts: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Form State
  const [formData, setFormData] = useState<Partial<Product>>({
    title: '',
    price: 0,
    category: 'Templates',
    description: '',
    image: '',
    features: ['']
  });

  const resetForm = () => {
    setFormData({
      title: '',
      price: 0,
      category: 'Templates',
      description: '',
      image: '',
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size is too large. Please upload an image under 5MB.");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.price) return;

    const imageToUse = formData.image || 'https://picsum.photos/800/600';

    try {
      if (isEditing && editId) {
        await updateProduct(editId, { ...formData, image: imageToUse });
      } else {
        await addProduct({
          title: formData.title!,
          description: formData.description || '',
          price: Number(formData.price),
          category: formData.category || 'Assets',
          image: imageToUse,
          rating: 0,
          reviews: 0,
          features: formData.features?.filter(f => f.trim() !== '') || []
        });
      }
      resetForm();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product. Please try again.');
    }
  };

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout 
      title="Products" 
      action={
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <Plus size={18} /> Add Product
        </Button>
      }
    >
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
                    
                    <div className="relative group">
                      <div className={`
                        border-2 border-dashed rounded-xl p-0 flex flex-col items-center justify-center text-center transition-all cursor-pointer overflow-hidden
                        ${formData.image 
                          ? 'border-primary bg-white' 
                          : 'border-gray-300 hover:border-primary hover:bg-gray-50 bg-gray-50'
                        }
                      `}>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        
                        {formData.image ? (
                          <div className="relative w-full aspect-[4/3]">
                             <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                             <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                <UploadCloud size={24} className="text-white mb-2" />
                                <p className="text-white font-medium text-sm">Change Image</p>
                             </div>
                          </div>
                        ) : (
                          <div className="py-10 px-6">
                            <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-primary mx-auto mb-3">
                              <ImageIcon size={24} />
                            </div>
                            <p className="text-sm font-medium text-gray-700">Click to upload image</p>
                            <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                          </div>
                        )}
                      </div>
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

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Search Bar */}
        <div className="p-4 border-b border-gray-100 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

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
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-100">
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
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    No products found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProducts;