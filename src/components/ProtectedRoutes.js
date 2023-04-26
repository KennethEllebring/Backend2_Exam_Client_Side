import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoutes = () => {
  const { loggedIn, loading } = useAuth();
  if (loading) {
    return null;
  }
  return loggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
