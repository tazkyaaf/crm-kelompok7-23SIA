import {
  LayoutDashboard,
  Users,           // Workflow Development
  ShoppingCart,   // Penjualan, Order, Invoicing
  Box,            // Produk
  BarChart2,      // Laporan
  Settings,       // Pengaturan Akun, Service Configuration
  User,           // Produksi, Transaksi
  BadgePercent,
  LogIn,          // Sign In
  UserPlus,       // Pelanggan, Kasir, Sign Up
  ShoppingBag,    // Manajemen Diskon
  Share2,         // Social Media Management
  Gift,           // Loyalty Management
} from 'lucide-react';

import { FaShoppingCart, FaPhoneAlt, FaFileAlt } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { name: 'Dashboard', icon: <LayoutDashboard />, path: '/' },
  { name: 'Invoicing', icon: <ShoppingCart />, path: '/invoicing' },
  { name: 'Service Configuration', icon: <Settings />, path: '/serviceconfiguration' },
  { name: 'Workflow Development', icon: <Users />, path: '/workflow' },
  { name: 'Order Management', icon: <FaShoppingCart />, path: '/order' },
  { name: 'Contact Management', icon: <FaPhoneAlt />, path: '/contact' },
  { name: 'Content Management', icon: <FaFileAlt />, path: '/content' },
  { name: 'Social Media', icon: <Share2 />, path: '/socialmediamanagement' },
  { name: 'Loyalty Program', icon: <Gift />, path: '/loyaltymanagement' },
];

const accountItems = [
  { name: 'Pengaturan Akun', icon: <Settings />, path: '/akun' },
  { name: 'Sign In', icon: <LogIn />, path: '/signin' },
  { name: 'Sign Up', icon: <UserPlus />, path: '/signup' },
];

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <aside className="bg-white w-64 h-screen shadow-lg px-4 py-6 hidden md:block">
      <div className="text-xl font-bold mb-8 text-purple-700">UMKM CRM</div>

      <nav className="space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-purple-100 transition ${
              isActive(item.path)
                ? 'bg-purple-200 text-purple-800 font-semibold'
                : 'text-gray-700'
            }`}
          >
            <span className="w-5 h-5">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="mt-8 text-xs font-semibold text-gray-500">AKUN</div>
      <nav className="mt-2 space-y-1">
        {accountItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-purple-100 transition ${
              isActive(item.path)
                ? 'bg-purple-200 text-purple-800 font-semibold'
                : 'text-gray-700'
            }`}
          >
            <span className="w-5 h-5">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
