import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import MainLayout from "./components/MainLayout";
import CustomerManagement from "./pages/CustomerManagement";
import KasirManagement from "./pages/KasirManagement";
import SalesManagement from "./pages/SalesManagement";

import LoyaltyAdminPage from "./pages/LoyaltyAdminPage";
import OrderManagementPage from "./pages/OrderManagement";
import MembershipSelectionPage from "./pages/MembershipSelectionPage";
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
        <Route path="Loyalty" element={<LoyaltyAdminPage />} />
        <Route path="Membership" element={<MembershipSelectionPage />} />
      </Route>
    </Routes>
  );
}

export default App
