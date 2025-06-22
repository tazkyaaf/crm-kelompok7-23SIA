import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import SocialMediaManagement from "./pages/SocialMediaManagement";
import LoyaltyManagement from "./pages/LoyaltyManagement";
import CustomerManagement from "./pages/CustomerManagement";
import KasirManagement from "./pages/KasirManagement";
import SalesManagement from "./pages/SalesManagement";
import OrderManagementPage from "./pages/OrderManagementPage";
import ContactManagement from "./pages/ContactManagement";
import ContentManagement from "./pages/ContentManagement";
import Produksi from "./pages/Produksi";
import ManagementDiskon from "./pages/ManagementDiskon";
import Transaksi from "./pages/Transaksi";
import InvoicingPage from "./pages/InvoicingPage";
import ServiceConfigurationPage from "./pages/ServiceConfigurationPage";
import WorkflowDevelopment from "./pages/WorkFlowDevelopment";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/socialmediamanagement" element={<SocialMediaManagement />} />
        <Route path="/loyaltymanagement" element={<LoyaltyManagement />} />
        <Route path="/pelanggan" element={<CustomerManagement />} />
        <Route path="/produksi" element={<Produksi />} />
        <Route path="/kasir" element={<KasirManagement />} />
        <Route path="/penjualan" element={<SalesManagement />} />
        <Route path="/management-diskon" element={<ManagementDiskon />} />
        <Route path="/order" element={<OrderManagementPage />} />
        <Route path="/transaksi" element={<Transaksi />} />
        <Route path="/invoicing" element={<InvoicingPage />} />
        <Route path="/serviceconfiguration" element={<ServiceConfigurationPage />} />
        <Route path="/workflow" element={<WorkflowDevelopment />} />
        <Route path="/contact" element={<ContactManagement />} />
        <Route path="/content" element={<ContentManagement />} />
      </Route>
    </Routes>
  );
}

export default App;
