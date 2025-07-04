import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  Package,
  Users,
  Star,
  Phone,
  Settings,
  LogIn,
  LogOut,
  User,
} from "lucide-react";


import htmLogo from '../../assets/lgbiru.png'; // ← sesuaikan jika kamu simpan di src/assets

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user") || "null");
        setUser(storedUser);
      } catch {
        setUser(null);
      }
    };

    loadUser();

    const handleUserChange = () => {
      loadUser();
    };

    window.addEventListener("userChanged", handleUserChange);
    return () => {
      window.removeEventListener("userChanged", handleUserChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("rememberLogin");
    window.dispatchEvent(new Event("userChanged"));
    setUser(null);
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { name: "Beranda", path: "/", icon: Home },
    { name: "Layanan", path: "/service", icon: Package },
    { name: "Track Order", path: "/order", icon: Star },
    { name: "Membership", path: "/membership", icon: Users },
    { name: "Contact", path: "/contact", icon: Phone },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo + Brand */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src={htmLogo}
                alt="HTM Laundry Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xl font-semibold text-blue-600">HTM LAUNDRY</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors ${
                  isActive(item.path) ? "text-blue-600 border-b-2 border-blue-600" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* User & Menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="hidden md:flex items-center space-x-2">
                {user.role === "admin" && (
                  <Link to="/admin/dashboard">
                    <button className="border px-3 py-1 text-sm rounded flex items-center">
                      <Settings className="w-4 h-4 mr-2" /> Admin
                    </button>
                  </Link>
                )}
                <div className="flex items-center space-x-2 px-3 py-1 bg-[#c8e2fb] rounded-lg">
                  <User className="w-4 h-4 text-[#1c2c40]" />
                  <span className="text-sm text-[#1c2c40] font-medium">
                    {user.name}
                  </span>
                  {user.role === "customer" && (
                    <span className="text-xs text-[#1c2c40] bg-[#a9cdf7] px-2 py-1 rounded-full">
                      {user.membershipTier}
                    </span>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="border px-3 py-1 text-sm rounded text-red-600 hover:text-red-700 flex items-center"
                >
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Link to="/register">
                  <button className="border border-blue-600 text-blue-600 px-3 py-1 text-sm rounded hover:bg-blue-600 hover:text-white">
                    Daftar
                  </button>
                </Link>
                <Link to="/login">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-sm rounded">
                    Login
                  </button>
                </Link>
              </div>
            )}

            {/* Mobile Toggle */}
            <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden border-t">
            <div className="py-4 space-y-2">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? "text-[#1c2c40] bg-[#c8e2fb]"
                        : "text-gray-600 hover:text-[#1c2c40] hover:bg-[#c8e2fb]/50"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}

              {user ? (
                <>
                  {user.role === "admin" && (
                    <Link
                      to="/admin/dashboard"
                      className="flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-600 hover:text-[#1c2c40] hover:bg-[#c8e2fb]/50"
                      onClick={() => setIsOpen(false)}
                    >
                      <Settings className="w-5 h-5" />
                      <span>Admin Panel</span>
                    </Link>
                  )}
                  <div className="flex items-center space-x-3 px-3 py-3 bg-[#c8e2fb] rounded-lg">
                    <User className="w-5 h-5 text-[#1c2c40]" />
                    <div className="flex flex-col">
                      <span className="text-[#1c2c40] font-medium">{user.name}</span>
                      {user.role === "customer" && (
                        <span className="text-xs text-[#1c2c40]">
                          Member {user.membershipTier}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="flex items-center space-x-3 px-3 py-3 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-600 hover:text-[#1c2c40] hover:bg-[#c8e2fb]/50"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    <span>Daftar</span>
                  </Link>
                  <Link
                    to="/login"
                    className="flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-600 hover:text-[#1c2c40] hover:bg-[#c8e2fb]/50"
                    onClick={() => setIsOpen(false)}
                  >
                    <LogIn className="w-5 h-5" />
                    <span>Login</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
