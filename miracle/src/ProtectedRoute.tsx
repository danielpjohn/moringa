// ProtectedRoute.tsx
import { useAuth } from "./features/Login/AuthContext";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!loading) {
      setShowContent(isAuthenticated);
    }
  }, [isAuthenticated, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <Outlet />;
}