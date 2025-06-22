import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./components/MainLayout";
import CustomerManagement from "./pages/CustomerManagement";
import KasirManagement from "./pages/KasirManagement";
import SalesManagement from "./pages/SalesManagement";
import OrderManagementPage from "./pages/OrderManagementPage";
// import SalesManagement from "./pages/SalesManagement";
import Produksi from './pages/Produksi';
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
        <Route path="pelanggan" element={<CustomerManagement />} />
        <Route path="produksi" element={<Produksi />} />
        <Route path="kasir" element={<KasirManagement />} />
        <Route path="Penjualan" element={<SalesManagement />} />
        <Route path="/management-diskon" element={<ManagementDiskon />} />
        <Route path="Order" element={<OrderManagementPage />} />
        <Route path='/penjualan' element={<SalesManagement />} />
        <Route path="/produksi" element={<Produksi />} />
        <Route path="/transaksi" element={<Transaksi/>} />
        <Route path="/invoicing" element={<InvoicingPage />} />
        <Route path="/serviceconfiguration" element={<ServiceConfigurationPage />} />
        <Route path="/workflow" element={<WorkflowDevelopment />} />

       
      </Route>
    </Routes>
  );
}

export default App
