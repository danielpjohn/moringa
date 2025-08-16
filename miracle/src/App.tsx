import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./features/Home/home";
import ViewAllProducts from "./features/AllProducts/AllProduct";
import Checkout from "./features/Checkout/checkout";
import Login from "./features/Login/login";
import AdminLayout from "./features/Admin/admin";
import UserPage from "./features/Admin/userDetails/UserPage";
import AddCouponPage from "./features/Admin/addCoupon/coupon";
import AddProductPage from "./features/Admin/addProduct/addProduct";
import AddCategoryForm from "./features/Admin/addCategory/addcategory";
import Register from "./features/Login/register";
import ProtectedRoute from './ProtectedRoute';
import { AuthProvider } from "./features/Login/AuthContext";
import AdminProtectedRoute from './AdminProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from "./features/Products/cart";
import About from "./features/About/about";
import LearnMore from "./features/WhyMoringa/LearnMore";
import { useEffect } from "react";
import MoringaRecipes from "./features/MoringaRecipes/MoringaRecipes";
import Product from "./features/Products/Product";

// Scroll to top on route change
function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          {/* Protected user routes */}
          {/* <Route element={<ProtectedRoute />}> */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/products" element={<Product />} />
          <Route path="/about" element={<About />} />
          <Route path="/learnmore" element={<LearnMore />} />
          <Route path="/recipe" element={<MoringaRecipes />} />
          {/* </Route> */}

          {/* Protected admin routes */}
          {/* <Route element={<AdminProtectedRoute />}> */}
            <Route path="/admin" element={<AdminLayout />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/addproduct" element={<AddProductPage />} />
            <Route path="/addcategory" element={<AddCategoryForm />} />
            <Route path="/coupon" element={<AddCouponPage />} />
          {/* </Route> */}

          {/* Default redirect */}
          <Route path="*" element={<Home />} />
        </Routes>
      </AuthProvider>
      <ToastContainer position="top-right" autoClose={3000} style={{ top: '120px' }} />
    </Router>
  );
}

export default App;
