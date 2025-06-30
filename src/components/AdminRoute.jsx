// components/AdminRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const user = JSON.parse(localStorage.getItem("user")); // atau dari context/auth

  if (!user) {
    return <Navigate to="/" />;
  }

  
  if (user.role !== "admin") {
    return (
      <div className="p-10 text-center text-red-600 text-xl">
        Akses ditolak: Halaman ini hanya untuk admin.
      </div>
    );
  }

  return <Outlet />;
};

export default AdminRoute;
