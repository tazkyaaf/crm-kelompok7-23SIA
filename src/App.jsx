import { Routes, Route } from "react-router-dom";

// Layout
import MainLayout from "./components/MainLayout";
import AdminRoute from "./components/AdminRoute";
import CustomerLayout from "./customer/components/CustomerLayout";

// Pages
import Dashboard from "./pages/Dashboard";
import SocialMediaManagement from "./pages/SocialMediaManagement";
import LoyaltyManagement from "./pages/LoyaltyManagement";
import OrderManagementPage from "./pages/OrderManagementPage";
import ContactManagement from "./pages/ContactManagement";
import ContentManagement from "./pages/ContentManagement";
import ServiceConfigurationPage from "./pages/ServiceConfigurationPage";
import WorkflowDevelopment from "./pages/WorkFlowDevelopment";
import InvoicingPage from "./pages/InvoicingPage";
import InvoicingPage from "./pages/InvoicingPage";
import ServiceConfigurationPage from "./pages/ServiceConfigurationPage";
import WorkflowDevelopment from "./pages/WorkFlowDevelopment";
import OrderManagementPage from "./pages/OrderManagementPage";
import ContactManagement from "./pages/ContactManagement";
import ContentManagement from "./pages/ContentManagement";
import SocialMediaManagement from "./pages/SocialMediaManagement";
import LoyaltyManagement from "./pages/LoyaltyManagement";
import User from "./pages/User";

// Customer Pages
import Home from "./customer/pages/Home";
import Service from "./customer/pages/Service";
import Membership from "./customer/pages/Membership";
import SignIn from "./pages/SignIn";
import Contact from "./customer/pages/Contact";
import Order from "./customer/pages/Order";



function App() {
  return (
    <Routes>
      
      {/* Halaman Customer */}
      <Route element={<CustomerLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/service" element={<Service />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/order" element={<Order />} />
        <Route path="/signin/admin" element={<SignIn role="admin" />} />
        <Route path="/signin/customer" element={<SignIn role="customer" />} />
         <Route path="/" element={<Home />} />
      </Route>

      {/* Halaman Admin */}
      <Route element={<AdminRoute />}>
        <Route element={<MainLayout />}>
        
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/invoicing" element={<InvoicingPage />} />
          <Route path="/serviceconfiguration" element={<ServiceConfigurationPage />} />
          <Route path="/workflow" element={<WorkflowDevelopment />} />
          <Route path="/orderManagement" element={<OrderManagementPage />} />
          <Route path="/contactManagement" element={<ContactManagement />} />
          <Route path="/content" element={<ContentManagement />} />
          <Route path="/socialmediamanagement" element={<SocialMediaManagement />} />
          <Route path="/loyaltymanagement" element={<LoyaltyManagement />} />
          <Route path="/user" element={<User />} />
        </Route>
      </Route>

      {/* Halaman Tidak Ditemukan */}
      <Route
        path="*"
        element={
          <div className="p-10 text-center text-red-600 text-xl">
            404 - Halaman tidak ditemukan
          </div>
        }
      />
    </Routes>
  );
}

export default App;
