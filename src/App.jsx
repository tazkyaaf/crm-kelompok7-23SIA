import { Routes, Route } from "react-router-dom";
import OrderManagementPage from "./pages/OrderManagementPage";
import ContactManagement from "./pages/ContactManagement";
import ContentManagement from "./pages/ContentManagement";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";

// import SalesManagement from "./pages/SalesManagement";


function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
    
       <Route path="Order" element={<OrderManagementPage />} />
       <Route path="/contact" element={<ContactManagement/>} />
       <Route path="/content" element={<ContentManagement/>} />
      </Route>
    </Routes>
  );
}

export default App
