import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../utils/useAuth";

const ProtectedRoutes = () => {
  let status = useAuth();
  if (status) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoutes;
