import { FaCheck, FaClock, FaSignOutAlt, FaTasks } from "react-icons/fa";
import { useAuthentication } from "../context/StateProvider";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ACTIONS } from "../context/actions";

const MobileMenu = () => {
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
    <div className="py-1">
      <ul className="p1 m-1 list-unstyled">
        <Link className="text-decoration-none" to="/">
          <li className="py-2 border-bottom liMenu d-flex justify-content-between align-items-center">
            <span className="text-muted">Dashboard</span>
            <span>
              <FaTasks className="icon iconMenu" />
            </span>
          </li>
        </Link>

        <Link className="text-decoration-none" to="confirmed">
          <li className="py-2 border-bottom d-flex align-items-center liMenu d-flex justify-content-between align-items-center">
            <span className="text-muted">Confirmed</span>
            <span>
              <FaCheck className="icon iconMenu" />
            </span>
          </li>
        </Link>
        <Link className="text-decoration-none" to="pending">
          <li className="py-2 border-bottom d-flex align-items-center liMenu d-flex justify-content-between align-items-center">
            <span className="text-muted">Pending</span>
            <span>
              <FaClock
                className="icon iconMenu"
                style={{ backgroundColor: "#ffc107" }}
              />
            </span>
          </li>
        </Link>
        <li
          className="py-2 d-flex align-items-center liMenu d-flex justify-content-between align-items-center"
          onClick={(e) => handleLogout(e)}
        >
          <span className="text-muted">Logout</span>
          <span>
            <FaSignOutAlt className="icon iconMenu" />
          </span>
        </li>
      </ul>
    </div>
  );
};

export default MobileMenu;
