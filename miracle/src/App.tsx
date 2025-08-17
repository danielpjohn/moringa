import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { 
  Home, 
  Checkout, 
  Login, 
  AdminDashboard, 
  UserPage, 
  AddCoupon, 
  AddProduct, 
  AddCategory, 
  Register,
  Cart,
  AboutPage,
  LearnMore,
  RecipeGallery,
  Products
} from "./components/organisms";
import ContactForm from "./components/organisms/Contact/contact";
import { AuthProvider } from "./components/organisms/Login/AuthContext";
// import ProtectedRoute from "./routes/ProtectedRoute";
import AdminProtectedRoute from "./routes/AdminProtectedRoute";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import AddRecipePage from "./components/organisms/Admin/addRecipe/addrecipe";

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
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contact" element={<ContactForm />} />
          {/* Protected user routes */}
          {/* <Route element={<ProtectedRoute />}> */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/learnmore" element={<LearnMore />} />
          <Route path="/recipe" element={<RecipeGallery />} />
          {/* </Route> */}

          {/* Protected admin routes */}
          <Route element={<AdminProtectedRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/addcategory" element={<AddCategory />} />
            <Route path="/coupon" element={<AddCoupon />} />
            <Route path="/addrecipes" element={<AddRecipePage />} />
          </Route>

          {/* Default redirect */}
          <Route path="*" element={<Home />} />
        </Routes>
      </AuthProvider>
      <ToastContainer position="top-right" autoClose={3000} style={{ top: '120px' }} />
    </Router>
  );
}

export default App;
