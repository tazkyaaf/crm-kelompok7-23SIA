import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ user, onLogout, onLogin }) => {
  const navigate = useNavigate();
  const [isMember, setIsMember] = useState(false);

  return (
    <>
      {!isMember && user && (
        <div className="w-full bg-yellow-100 text-yellow-800 text-center text-sm py-2">
          Promo hanya untuk member. <Link to="/membership" className="underline">Gabung sekarang</Link>
        </div>
      )}

      <header className="w-full bg-white shadow-md px-6 md:px-16 py-4 flex items-center justify-between fixed top-0 z-50">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="text-blue-700 text-xl font-bold cursor-pointer flex items-center gap-2"
        >
          <img src="/assets/logo.png" alt="HTM Logo" className="w-6 h-6" />
          HTM LAUNDRY
        </div>

        {/* Nav Menu */}
        <nav className="hidden md:flex space-x-6 text-gray-700 text-sm font-medium">
          <Link to="/home" className="hover:text-blue-600">Home</Link>
          <Link to="/order" className="hover:text-blue-600">Order</Link>
          <Link to="/service" className="hover:text-blue-600">Service</Link>
          <Link to="/membership" className="hover:text-blue-600">Membership</Link>
          <Link to="/contact" className="hover:text-blue-600">Contact us</Link>
        </nav>

        {/* Login / Logout */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm text-gray-700 hidden md:inline">Hi, {user.email}</span>
              <button
                onClick={onLogout}
                className="bg-red-500 text-white px-4 py-1.5 text-sm rounded-full font-semibold hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={onLogin}
              className="text-sm font-semibold text-blue-600 hover:underline"
            >
              Login
            </button>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;