import { Navigate, Outlet } from "react-router-dom";
import { isUserAdmin } from "../constants/authUtils";
import { useAuth } from "../components/organisms/Login/AuthContext";

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