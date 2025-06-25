import { Search, Settings, Bell } from "lucide-react";
import { useLocation } from "react-router-dom";
import logo from "../assets/logo1.png";         // Pastikan file ada di folder src/assets/
import profilePic from "../assets/logo1.png";   // Ganti dengan file foto profil jika ada

// Mapping path ke judul halaman
const pageTitles = {
  "/": "Dashboard",
  "/invoicing": "Invoicing",
  "/serviceconfiguration": "Service Configuration",
  "/workflow": "Workflow Development",
  "/contact": "Contact Management",
  "/order": "Order Management",
  "/content": "Content Management",
  "/socialmediamanagement": "Social Media Management",
  "/loyaltymanagement": "Loyalty Management",
  "/signin": "Sign In",
  "/signup": "Sign Up",
  "/user": "User Profile",
};

const Header = () => {
  const location = useLocation();
  const pageTitle = pageTitles[location.pathname] || "Page";

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white border-b border-gray-100 sticky top-0 z-10">
      {/* Kiri: Logo + Judul */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
        </div>
        <h1 className="ml-6 text-lg font-semibold text-gray-800">{pageTitle}</h1>
      </div>

      {/* Kanan: Search + Ikon + Profil */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search for something"
            className="pl-10 pr-4 py-2 text-sm rounded-full bg-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
        </div>

        {/* Icon Tombol */}
        <button className="w-9 h-9 flex items-center justify-center bg-gray-100 rounded-full hover:bg-blue-100">
          <Settings className="w-4 h-4 text-gray-700" />
        </button>
        <button className="w-9 h-9 flex items-center justify-center bg-gray-100 rounded-full hover:bg-blue-100">
          <Bell className="w-4 h-4 text-gray-700" />
        </button>

        {/* Foto Profil */}
        <img
          src={profilePic}
          alt="Profile"
          className="w-9 h-9 rounded-full object-cover border border-gray-300"
        />
      </div>
    </header>
  );
};

export default Header;