import { FaCheck, FaClock, FaTasks, FaTruck } from "react-icons/fa";
import { Link } from "react-router-dom";

const DesktopMenu = () => {
  return (
    <div className="p-3 m-3">
      <ul className="p1 m-1 list-unstyled">
        <Link className="text-decoration-none" to="/">
          <li className="py-2 border-bottom liMenu">
            <span>
              <FaTasks className="icon iconMenu" />
            </span>
            <span className="text-muted">Dashboard</span>
          </li>
        </Link>

        <Link className="text-decoration-none" to="confirmed">
          <li className="py-2 border-bottom d-flex align-items-center liMenu">
            <span>
              <FaCheck className="icon iconMenu" />
            </span>
            <span className="text-muted">Confirmed</span>
          </li>
        </Link>
        <Link className="text-decoration-none" to="pending">
          <li className="py-2 border-bottom d-flex align-items-center liMenu">
            <span>
              <FaClock
                className="iconSmall"
                style={{ backgroundColor: "#ffc107" }}
              />
            </span>
            <span className="text-muted">Pending</span>
          </li>
        </Link>
        <Link className="text-decoration-none" to="quote-form">
          <li className="py-2 border-bottom liMenu">
            <span>
              <FaTruck className="icon iconMenu" />
            </span>
            <span className="text-muted">Get Quote</span>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default DesktopMenu;
