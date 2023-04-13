import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

//If the user is authenticated, navigates to desired page. Otherwise redirects user to login page
const ProtectedRoutes = () => {
  const { loggedIn, loading } = useAuth();
  if (loading) {
    return null
  }
  return loggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;