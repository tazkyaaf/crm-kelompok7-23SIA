import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./components/MainLayout";
import CustomerManagement from "./pages/CustomerManagement";
import KasirManagement from "./pages/KasirManagement";
import SalesManagement from "./pages/SalesManagement";
// import SalesManagement from "./pages/SalesManagement";
import SalesManagement from "./pages/SalesManagement";
import Produksi from './pages/Produksi';


function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
    
        <Route path="pelanggan" element={<CustomerManagement />} />
<<<<<<< HEAD
        <Route path='/penjualan' element={<SalesManagement />} />
          <Route path="/produksi" element={<Produksi />} />
       
=======
        <Route path="kasir" element={<KasirManagement />} />
        <Route path="Penjualan" element={<SalesManagement />} />
>>>>>>> origin/ginta
      </Route>
    </Routes>
  );
}

export default App
