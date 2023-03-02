import { Navigate, Outlet } from "react-router-dom";
import useToken from "../utils/useToken";
import useId from "../utils/useId";
const ProtectedRoutes = () => {
  let status = useToken();
  let id = useId();
  if (status && id) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoutes;
