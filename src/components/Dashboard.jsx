import { useEffect, useState } from "react";
import { FaCheck, FaClock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useOrders } from "../context/StateProvider";
import { ACTIONS } from "../context/actions";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [confirmed, setConfirmed] = useState(0);
  const [pending, setPending] = useState(0);
  const [display, setDisplay] = useState(false);
  const navigate = useNavigate();
  const { ordersDispatch } = useOrders();

  useEffect(() => {
    let unsubcribeFromFirestore;
    const unsubcribeFromAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const querySnapShot = query(
          collection(db, "orders"),
          "orders",
          where("clientId", "==", auth.currentUser.uid)
        );
        unsubcribeFromFirestore = onSnapshot(querySnapShot, (snapshot) => {
          if (snapshot.empty) {
            setDisplay(false);
            setLoading(false);
          } else {
            for (let i = 0; i < snapshot.docs.length; i++) {
              let order = snapshot.docs[i].data();
              console.log(order);
              if (order.isConfirmed) {
                setConfirmed((prev) => prev + 1);
              } else {
                setPending((prev) => prev + 1);
              }
            }

            let ordersArray = [];
            for (let i = 0; i < snapshot.docs.length; i++) {
              const order = {
                ...snapshot.docs[i].data(),
                id: snapshot.docs[i].id,
              };
              ordersArray.push(order);
            }

            ordersDispatch({ type: ACTIONS.ADD_ORDERS, orders: ordersArray });
            setLoading(false);
            setDisplay(true);
          }
        });
      } else {
        navigate("/login");
        if (unsubcribeFromFirestore) {
          unsubcribeFromFirestore();
        }
      }
    });
    return () => {
      unsubcribeFromAuth();
      setConfirmed(0);
      setPending(0);
      if (unsubcribeFromFirestore) {
        unsubcribeFromFirestore();
      }
    };
  }, [navigate, ordersDispatch]);
  if (loading) {
    return <Loader loading={loading} description="Please wait" />;
  }
  return (
    <div>
      <div className="mx-3 pt-3 lead text-muted">
        <span>Dashboard</span>
      </div>
      {display && (
        <div>
          <div className="d-flex justify-content-center align-items-center flex-wrap">
            <div
              style={{ width: "367px" }}
              className="m-3 p-4 bg-white shadow-sm rounded"
            >
              <span className="text-muted" style={{ fontSize: "20px" }}>
                Pending
              </span>
              <div className="d-flex align-items-center">
                <span>
                  <FaClock
                    className="icon iconMenu me-3"
                    style={{ backgroundColor: "#ffc107" }}
                  />
                </span>
                <span className="me-3" style={{ fontSize: "30px" }}>
                  {pending}
                </span>
              </div>
              <div className="mt-3">
                {pending > 0 ? (
                  <Link
                    to="pending"
                    className="text-decoration-none ridelink-color"
                  >
                    View orders pending
                  </Link>
                ) : (
                  <span className="text-muted">No orders delivered</span>
                )}
              </div>
            </div>
            <div
              style={{ width: "367px" }}
              className="m-3 p-4 bg-white shadow-sm rounded"
            >
              <span className="text-muted" style={{ fontSize: "20px" }}>
                Confirmed
              </span>
              <div className="d-flex align-items-center">
                <span>
                  <FaCheck className="icon iconMenu me-3" />
                </span>
                <span className="me-3" style={{ fontSize: "30px" }}>
                  {confirmed}
                </span>
              </div>
              <div className="mt-3">
                {confirmed > 0 ? (
                  <Link
                    to="confirmed"
                    className="text-decoration-none ridelink-color"
                  >
                    View orders confirmed/ delivered
                  </Link>
                ) : (
                  <span className="text-muted">No orders delivered</span>
                )}
              </div>
            </div>
            {/* <div
              style={{ width: "367px" }}
              className="m-3 p-4 bg-white shadow-sm rounded"
            >
              <span className="text-muted" style={{ fontSize: "20px" }}>
                Amount Quoted
              </span>
              <div className="d-flex align-items-center">
                <span>
                  <FaClock
                    className="icon iconMenu me-3"
                    style={{ backgroundColor: "#ffc107" }}
                  />
                </span>
                <span className="me-3" style={{ fontSize: "30px" }}>
                  {amountQuoted.toLocaleString("en-US")}
                </span>
              </div>
            </div> */}
            {/* <div
              style={{ width: "367px" }}
              className="m-3 p-4 bg-white shadow-sm rounded"
            >
              <span className="text-muted" style={{ fontSize: "20px" }}>
                Amount Paid
              </span>
              <div className="d-flex align-items-center">
                <span>
                  <FaCheck className="icon iconMenu me-3" />
                </span>
                <span className="me-3" style={{ fontSize: "30px" }}>
                  {amountPaid.toLocaleString("en-US")}
                </span>
              </div>
            </div> */}
          </div>
        </div>
      )}

      {!display > 0 && (
        <div className="m-3 p-3 bg-white shadow-sm rounded lead text-center">
          <p> You have not placed any orders</p>
          <p>
            <Link to="/quote" className="text-decoration-none">
              Get Quote
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
