//AdminProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { isUserAdmin } from "./features/Login/authUtils"; // Update path if needed
import { useAuth } from "./features/Login/AuthContext";

export default function AdminProtectedRoute() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isUserAdmin(user)) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}