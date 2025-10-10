// ProtectedRoute.js
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../store/AuthContext";

const ProtectedRoute = () => {
  const { isAuthenticated,isLoading} = useAuth();
   if (isLoading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />; // renders the child routes 
};

export default ProtectedRoute;
