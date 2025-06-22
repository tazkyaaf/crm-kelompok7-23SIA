import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import SocialMediaManagement from "./pages/SocialMediaManagement";
import LoyaltyManagement from "./pages/LoyaltyManagement";
import Dashboard from "./pages/Dashboard";


function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/socialmediamanagement" element={<SocialMediaManagement/>} />
        <Route path="/loyaltymanagement" element={<LoyaltyManagement/>}/>
      </Route>
    </Routes>
  );
}

export default App
