import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Settings,
  LogIn,
  UserPlus,
  Share2,
  Gift,
  LogOut,
  Sparkle,
} from 'lucide-react';
import { FaShoppingCart, FaPhoneAlt, FaFileAlt } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import htmLogo from '../assets/lgbiru.png'; // Sesuaikan path logomu

const menuItems = [
  { name: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/admin/dashboard' },
  { name: 'Invoicing', icon: <ShoppingCart size={18} />, path: '/invoicing' },
  { name: 'Service Configuration', icon: <Settings size={18} />, path: '/serviceconfiguration' },
  { name: 'Workflow Development', icon: <Users size={18} />, path: '/workflow' },
  { name: 'Contact Management', icon: <FaPhoneAlt size={16} />, path: '/contactManagement' },
  { name: 'Order Management', icon: <FaShoppingCart size={16} />, path: '/orderManagement' },
  { name: 'Content Management', icon: <FaFileAlt size={16} />, path: '/content' },
  { name: 'Social Media Management', icon: <Share2 size={18} />, path: '/socialmediamanagement' },
  { name: 'Loyalty Management', icon: <Gift size={18} />, path: '/loyaltymanagement' },
  { name: 'Admin Setting', icon: <Settings size={18} />, path: '/setting' },
  { name: 'Prediksi', icon: <Sparkle size={18} />, path: '/prediction' },
];


const accountItems = [
  { name: 'Home', icon: <LogOut size={18} />, action: 'logout' },
];

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <aside className="bg-white w-64 h-screen px-4 py-6 hidden md:flex flex-col shadow-sm">
      {/* Logo & Branding */}
      <div className="flex items-center justify-center mb-10">
        <img src={htmLogo} alt="HTM Laundry" className="w-10 object-contain" />
        <p className="font-bold text-blue-600">HTM LAUNDRY</p>

      </div>

      {/* Main Menu */}
      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-md transition font-medium text-sm ${
              isActive(item.path)
                ? 'bg-blue-50 text-blue-600 font-semibold'
                : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            <div className="w-5 h-5 flex items-center justify-center">{item.icon}</div>
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Account Section */}
      <div className="text-xs text-gray-400 mt-6 mb-2 px-3">ACCOUNT</div>
      <nav className="space-y-1">
        {accountItems.map((item) => {
          if (item.action === 'logout') {
            return (
              <button
                key={item.name}
                onClick={() => {
                  localStorage.removeItem('userToken'); // Atur sesuai nama token
                  window.location.href = '/home';
                }}
                className="flex items-center w-full gap-3 px-3 py-2 rounded-md transition font-medium text-sm text-gray-400 hover:text-blue-600 hover:bg-blue-50"
              >
                <div className="w-5 h-5 flex items-center justify-center">{item.icon}</div>
                {item.name}
              </button>
            );
          }

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition font-medium text-sm ${
                isActive(item.path)
                  ? 'bg-blue-50 text-blue-600 font-semibold'
                  : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <div className="w-5 h-5 flex items-center justify-center">{item.icon}</div>
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
