import logo from "../assets/img/logo.png";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../context/StateProvider";
import { ACTIONS } from "../context/actions";

const DesktopHeader = () => {
  const navigate = useNavigate();
  const { authDispatch } = useAuthentication();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_API_HOST}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",
      });
      const data = await res.json();
      if (data.isLoggedOut) {
        authDispatch({ type: ACTIONS.LOGOUT });
        navigate("/login");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <div className="px-3 py-1 d-flex justify-content-between align-items-center bg-white shadow-sm">
        <div>
          <img src={logo} alt="logo" style={{ width: "120px" }} />
        </div>
        <div className="d-flex flex-row ">
          <div className="px-2 d-flex justify-content-between align-items-center">
            <span className="px-1 lead">Client</span>
            <span>
              <FaUser className="icon iconMenu" />
            </span>
          </div>
          <div className="px-2 d-flex justify-content-between align-items-center logoutBtn">
            <button className="btn p-0" onClick={(e) => handleLogout(e)}>
              <span className="ps-3">Logout</span>
              <span>
                <FaSignOutAlt className="icon iconMenu" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopHeader;
