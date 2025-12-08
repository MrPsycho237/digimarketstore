import React from 'react';
import { Mail, Trash2, MoreHorizontal } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import Button from '../../components/ui/Button';

// Mock Data
const MOCK_USERS = [
  { id: 'usr_1', name: 'Alex Johnson', email: 'alex@design.co', joined: 'Jan 12, 2024', spent: '$450.00', role: 'Customer' },
  { id: 'usr_2', name: 'Sarah Smith', email: 'sarah@tech.io', joined: 'Feb 23, 2024', spent: '$120.00', role: 'Customer' },
  { id: 'usr_3', name: 'Mike Brown', email: 'mike@studio.net', joined: 'Mar 10, 2024', spent: '$890.00', role: 'VIP' },
  { id: 'usr_4', name: 'Lisa Wilson', email: 'lisa@freelance.com', joined: 'Apr 05, 2024', spent: '$50.00', role: 'Customer' },
  { id: 'usr_5', name: 'David Lee', email: 'david@agency.org', joined: 'May 15, 2024', spent: '$1,200.00', role: 'VIP' },
];

const AdminUsers: React.FC = () => {
  return (
    <AdminLayout 
      title="Customers"
      action={
        <Button onClick={() => {}} className="flex items-center gap-2">
          <Mail size={18} /> Newsletter
        </Button>
      }
    >
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">User</th>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold">Joined</th>
                <th className="px-6 py-4 font-semibold">Total Spent</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_USERS.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-secondary">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                     <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      user.role === 'VIP' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">{user.joined}</td>
                  <td className="px-6 py-4 font-medium text-green-600">{user.spent}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-secondary hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreHorizontal size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
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
    </AdminLayout>
  );
};

export default AdminUsers;