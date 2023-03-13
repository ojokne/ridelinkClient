import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import Loader from "./Loader";
import { useOrders } from "../context/StateProvider";
import { FaTimes } from "react-icons/fa";

const Confirmed = () => {
  const [delivered, setDelivered] = useState(0);
  const [trip, setTrip] = useState(0);
  const navigate = useNavigate();
  const [display, setDisplay] = useState(false);
  const [loading, setLoading] = useState(true);
  const { orders } = useOrders();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (!user) {
        navigate("/login");
      } else {
        if (orders.hasOwnProperty("orders")) {
          if (orders.orders.length) {
            for (let i = 0; i < orders.orders.length; i++) {
              let order = orders.orders[i];
              if (order.isConfirmed) {
                if (order.isDelivered) {
                  setDelivered((prev) => prev + 1);
                } else {
                  setTrip((prev) => prev + 1);
                }
              }
            }
            setDisplay(true);
          }
        }
      }
    });

    return () => {
      setDelivered(0);
      setTrip(0);
    };
  }, [navigate, orders]);

  if (loading) {
    return <Loader loading={loading} description="Please wait" />;
  }
  return (
    <div>
      <div className="mx-3 pt-3 lead text-muted d-flex justify-content-between align-items-center">
        <span>Confirmed Orders</span>
        <span>
          <Link to="/" className="text-decoration-none ridelink-color">
            <FaTimes
              className="icon iconSmall me-3"
              style={{ backgroundColor: "red" }}
            />
          </Link>
        </span>
      </div>
      {display && (
        <div>
          <div className="d-flex justify-content-center align-items-center flex-wrap">
            <div
              style={{ width: "367px" }}
              className="m-3 p-4 bg-white shadow-sm rounded"
            >
              <span className="text-muted" style={{ fontSize: "20px" }}>
                On trip
              </span>
              <div className="d-flex align-items-center">
                <span>
                  <FaCheck
                    className="icon iconMenu me-3"
                    style={{ backgroundColor: "#ffc107" }}
                  />
                </span>
                <span className="me-3" style={{ fontSize: "30px" }}>
                  {trip}
                </span>
              </div>
              <div className="mt-3">
                {trip > 0 ? (
                  <Link
                    to="trip"
                    className="text-decoration-none ridelink-color"
                  >
                    View orders on trip
                  </Link>
                ) : (
                  <span className="text-muted">No orders on trip</span>
                )}
              </div>
            </div>
            <div
              style={{ width: "367px" }}
              className="m-3 p-4 bg-white shadow-sm rounded"
            >
              <span className="text-muted" style={{ fontSize: "20px" }}>
                Delivered
              </span>
              <div className="d-flex align-items-center">
                <span>
                  <FaCheck className="icon iconMenu me-3" />
                </span>
                <span className="me-3" style={{ fontSize: "30px" }}>
                  {delivered}
                </span>
              </div>
              <div className="mt-3">
                {delivered > 0 ? (
                  <Link
                    to="delivered"
                    className="text-decoration-none ridelink-color"
                  >
                    View orders delivered
                  </Link>
                ) : (
                  <span className="text-muted">No orders delivered</span>
                )}
              </div>
            </div>
          </div>
          <Outlet />
        </div>
      )}
      {!display && (
        <div className="m-3 p-3 bg-white shadow-sm rounded lead text-center">
          <p> No data to display</p>
          <p>
            <Link to="/" className="text-decoration-none">
              Back home
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};
export default Confirmed;
