// ProtectedRoute.tsx
import { useAuth } from "../components/organisms/Login/AuthContext";
import { Outlet, Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/home" replace state={{ from: location }} />;
  }

  return <Outlet />;
}