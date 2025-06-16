import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import MainLayout from "./components/MainLayout";
import CustomerManagement from "./pages/CustomerManagement";
import KasirManagement from "./pages/KasirManagement";
import SalesManagement from "./pages/SalesManagement";
import OrderManagementPage from "./pages/OrderManagementPage";
// import SalesManagement from "./pages/SalesManagement";


function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
    
        <Route path="pelanggan" element={<CustomerManagement />} />
        <Route path="kasir" element={<KasirManagement />} />
        <Route path="Penjualan" element={<SalesManagement />} />
        <Route path="Order" element={<OrderManagementPage />} />
      </Route>
    </Routes>
  );
}

export default App
