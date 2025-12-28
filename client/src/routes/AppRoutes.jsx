import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Sell from "../pages/Sell";
import Buy from "../pages/Buy";
import ProductDetails from "../pages/ProductDetails";
import Rent from "../pages/Rent";
import Contact from "../pages/Contact";
import Auth from "../pages/Auth";
import ProtectedRoute from "../components/ProtectedRoute";
import Profile from "../pages/Profile";
import OtpVerify from "../pages/OtpVerify";
import EditProfile from "../pages/EditProfile";
import Marketplace from "../pages/Marketplace";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/sell"
        element={
          <ProtectedRoute>
            <Sell />
          </ProtectedRoute>
        }
      />

      {/* <Route path="/buy" element={<Buy />} /> */}
      <Route path="/buy" element={<Marketplace />} />

      <Route path="/rent" element={<Rent />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/product/:id" element={<ProductDetails />} />

      <Route path="/auth" element={<Auth />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route path="/otp" element={<OtpVerify />} />

      <Route
        path="/profile/edit"
        element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
