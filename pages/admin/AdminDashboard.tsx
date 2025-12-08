import React from 'react';
import { BarChart3, Package, Users, TrendingUp, DollarSign, Clock } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminDashboard: React.FC = () => {
  const { products } = useStore();

  const stats = [
    { label: 'Total Revenue', value: '$12,450.00', icon: DollarSign, color: 'bg-green-50 text-green-600', trend: '+12.5%' },
    { label: 'Active Products', value: products.length, icon: Package, color: 'bg-indigo-50 text-primary', trend: '+2' },
    { label: 'Total Customers', value: '1,204', icon: Users, color: 'bg-orange-50 text-orange-600', trend: '+18%' },
    { label: 'Avg. Order Value', value: '$42.50', icon: TrendingUp, color: 'bg-blue-50 text-blue-600', trend: '+5.4%' },
  ];

  return (
    <AdminLayout title="Overview">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-secondary">{stat.value}</h3>
              <span className="text-xs font-medium text-green-600 flex items-center mt-1">
                {stat.trend} <span className="text-gray-400 font-normal ml-1">from last month</span>
              </span>
            </div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.color}`}>
              <stat.icon size={24} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-secondary">Recent Activity</h3>
            <button className="text-sm text-primary font-medium hover:underline">View All</button>
          </div>
          
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="text-sm text-gray-900 font-medium">New order #ORD-772{i} received</p>
                  <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Categories */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-secondary mb-6">Sales by Category</h3>
          <div className="space-y-4">
            {[
              { name: 'Templates', value: '45%', color: 'bg-primary' },
              { name: 'Courses', value: '30%', color: 'bg-accent' },
              { name: 'Ebooks', value: '15%', color: 'bg-purple-500' },
              { name: 'Music', value: '10%', color: 'bg-orange-500' },
            ].map((cat) => (
              <div key={cat.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{cat.name}</span>
                  <span className="font-bold text-gray-900">{cat.value}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className={`h-2 rounded-full ${cat.color}`} style={{ width: cat.value }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;