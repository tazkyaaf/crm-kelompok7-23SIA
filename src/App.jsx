import { Routes, Route } from "react-router-dom";


// Layout
// Layouts
import MainLayout from "./components/MainLayout";
import AdminRoute from "./components/AdminRoute";
import CustomerLayout from "./components/CustomerLayout";


// Admin Pages
import Dashboard from "./pages/Dashboard";
import AdminSettings from "./pages/AdminSettings";
import OrderManagementPage from "./pages/OrderManagementPage";
import ContactManagement from "./pages/ContactManagement";
import ContentManagement from "./pages/ContentManagement";
import SocialMediaManagement from "./pages/SocialMediaManagement";
import LoyaltyManagement from "./pages/LoyaltyManagement";
// NOTE: Tambahkan jika file berikut tersedia
import InvoicingPage from "./pages/InvoicingPage";
import ServiceConfigurationPage from "./pages/ServiceConfigurationPage";
import WorkflowDevelopment from "./pages/WorkflowDevelopment";

// Customer Pages
import Home from "./customer/pages/Home";
import Service from "./customer/pages/Service";
import Membership from "./customer/pages/Membership";
import Contact from "./customer/pages/Contact";
import Order from "./customer/pages/Order";
import Login from "./customer/pages/Login";

import ResetPassword from "./customer/pages/ResetPassword";
import NotFound from "./customer/pages/NotFound";
import Register from "./customer/pages/register";


function App() {
  return (
    <Routes>
      {/* Halaman Customer */}
      <Route element={<CustomerLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/service" element={<Service />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/order" element={<Order />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
      </Route>

      {/* Halaman Admin */}
      <Route element={<AdminRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/setting" element={<AdminSettings />} />
          <Route path="/invoicing" element={<InvoicingPage />} />
          <Route path="/serviceconfiguration" element={<ServiceConfigurationPage />} />
          <Route path="/workflow" element={<WorkflowDevelopment />} />
          <Route path="/orderManagement" element={<OrderManagementPage />} />
          <Route path="/contactManagement" element={<ContactManagement />} />
          <Route path="/content" element={<ContentManagement />} />
          <Route path="/socialmediamanagement" element={<SocialMediaManagement />} />
          <Route path="/loyaltymanagement" element={<LoyaltyManagement />} />
        </Route>
      </Route>

      {/* Halaman Tidak Ditemukan */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
