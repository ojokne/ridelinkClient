import { Navigate, Outlet } from "react-router-dom";
import { useAuthentication } from "../context/StateProvider";
import useAuth from "../utils/useAuth";

const ProtectedRoutes = () => {
  useAuth();
  const { auth } = useAuthentication();
  console.log(auth);
  if (auth?.isAuthenticated ?? false) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoutes;
