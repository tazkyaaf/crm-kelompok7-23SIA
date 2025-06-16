import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./components/MainLayout";
import CustomerManagement from "./pages/CustomerManagement";
import KasirManagement from "./pages/KasirManagement";
import SalesManagement from "./pages/SalesManagement";
// import SalesManagement from "./pages/SalesManagement";
import Produksi from './pages/Produksi';
import ManagementDiskon from "./pages/ManagementDiskon";


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
      </Route>
    </Routes>
  );
}

export default App
