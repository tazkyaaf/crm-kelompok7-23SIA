import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../customer/components/Header";
import Footer from "../customer/components/Footer";

const CustomerLayout = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (stored) setUser(stored);
  }, []);

  
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    alert("Berhasil logout");
    navigate("/home");
  };

  
  const handleLogin = () => navigate("/signin/customer");

  return (
    <>
      <Header user={user} onLogout={handleLogout} onLogin={handleLogin} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default CustomerLayout;
