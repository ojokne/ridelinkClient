import { Navigate, Outlet } from "react-router-dom";
import { useAuthentication } from "../context/StateProvider";
import useAuth from "../utils/useAuth";

const ProtectedRoutes = () => {
  const { auth } = useAuthentication();
  useAuth();
  if (auth?.isAuthenticated ?? false) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoutes;
