import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import MainLayout from "./components/MainLayout";
import CustomerManagement from "./pages/CustomerManagement";
// import SalesManagement from "./pages/SalesManagement";


function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
    
        <Route path="pelanggan" element={<CustomerManagement />} />
      </Route>
    </Routes>
  );
}

export default App
