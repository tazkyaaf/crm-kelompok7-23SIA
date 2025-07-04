import { useState } from "react";
import { Search, Settings, Bell } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import profilePic from "../assets/admin.png";

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
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const pageTitle = pageTitles[location.pathname] || "Page";

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      console.log("Searching for:", searchQuery);
      // Bisa diarahkan ke halaman pencarian
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSettingsClick = () => {
    console.log("Navigating to settings");
    navigate("/settings"); // Pastikan route ada
  };

  const handleNotificationsClick = () => {
    alert("No new notifications 🔔");
  };

  const handleProfileClick = () => {
    navigate("/user");
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white border-b border-gray-100 sticky top-0 z-10">
      {/* Kiri: Judul */}
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold text-gray-800">{pageTitle}</h1>
      </div>

      {/* Kanan: Pencarian + Ikon */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for something"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            className="pl-10 pr-4 py-2 text-sm rounded-full bg-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
        </div>

        <button
          onClick={handleSettingsClick}
          className="w-9 h-9 flex items-center justify-center bg-gray-100 rounded-full hover:bg-blue-100"
        >
          <Settings className="w-4 h-4 text-gray-700" />
        </button>

        <button
          onClick={handleNotificationsClick}
          className="w-9 h-9 flex items-center justify-center bg-gray-100 rounded-full hover:bg-blue-100"
        >
          <Bell className="w-4 h-4 text-gray-700" />
        </button>

        <button onClick={handleProfileClick}>
          <img
            src={profilePic}
            alt="Profile"
            className="w-9 h-9 rounded-full object-cover border border-gray-300"
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
