import React from 'react';
import { ChevronRight, Download, Filter } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import Button from '../../components/ui/Button';

// Mock Data
const MOCK_ORDERS = [
  { id: '#ORD-7721', customer: 'alex@design.co', date: 'Oct 24, 2024', total: '$128.00', status: 'Completed', items: 3 },
  { id: '#ORD-7722', customer: 'sarah@tech.io', date: 'Oct 23, 2024', total: '$49.00', status: 'Completed', items: 1 },
  { id: '#ORD-7723', customer: 'mike@studio.net', date: 'Oct 23, 2024', total: '$215.00', status: 'Refunded', items: 4 },
  { id: '#ORD-7724', customer: 'lisa@freelance.com', date: 'Oct 22, 2024', total: '$29.00', status: 'Completed', items: 1 },
  { id: '#ORD-7725', customer: 'john@agency.com', date: 'Oct 21, 2024', total: '$89.00', status: 'Completed', items: 2 },
  { id: '#ORD-7726', customer: 'emma@creative.co', date: 'Oct 20, 2024', total: '$15.00', status: 'Pending', items: 1 },
];

const AdminOrders: React.FC = () => {
  return (
    <AdminLayout 
      title="Orders"
      action={
        <Button variant="outline" className="flex items-center gap-2">
          <Download size={18} /> Export CSV
        </Button>
      }
    >
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex gap-2">
            <button className="px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200">All</button>
            <button className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-100">Completed</button>
            <button className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-100">Refunded</button>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <Filter size={18} />
          </button>
        </div>

        <div className="overflow-x-auto">
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
                      order.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                      order.status === 'Refunded' ? 'bg-red-100 text-red-700' :
                      'bg-orange-100 text-orange-700'
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
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;