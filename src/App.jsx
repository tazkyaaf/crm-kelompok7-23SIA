import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import SocialMediaManagement from "./pages/SocialMediaManagement";
import LoyaltyManagement from "./pages/LoyaltyManagement";
import OrderManagementPage from "./pages/OrderManagementPage";
import ContactManagement from "./pages/ContactManagement";
import ContentManagement from "./pages/ContentManagement";
import ServiceConfigurationPage from "./pages/ServiceConfigurationPage";
import WorkflowDevelopment from "./pages/WorkFlowDevelopment";
import User from "./pages/User";
import InvoicingPage from "./pages/InvoicingPage";


function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/socialmediamanagement" element={<SocialMediaManagement />} />
        <Route path="/loyaltymanagement" element={<LoyaltyManagement />} />
   
    
        <Route path="/order" element={<OrderManagementPage />} />
     
        <Route path="/invoicing" element={<InvoicingPage />} />
        <Route path="/serviceconfiguration" element={<ServiceConfigurationPage />} />
        <Route path="/workflow" element={<WorkflowDevelopment />} />
        <Route path="Order" element={<OrderManagementPage />} />
        <Route path="/contact" element={<ContactManagement/>} />
        <Route path="/content" element={<ContentManagement/>} />
        <Route path="/order" element={<OrderManagementPage />} />
        <Route path="/user" element={<User />} />
        {/* <Route path="/invoicing" element={<InvoicingPage />} />
        <Route path="/serviceconfiguration" element={<ServiceConfigurationPage />} />
        <Route path="/workflow" element={<WorkflowDevelopment />} /> */}
        <Route path="/contact" element={<ContactManagement />} />
        <Route path="/content" element={<ContentManagement />} />
      </Route>
    </Routes>
  );
}

export default App;
