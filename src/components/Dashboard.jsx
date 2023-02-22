import { useEffect, useRef, useState } from "react";
import { FaCheck, FaClock } from "react-icons/fa";
import { useData } from "../context/StateProvider";
import { Link } from "react-router-dom";
import { ACTIONS } from "../context/actions";
import Loader from "./Loader";
import useAuth from "../utils/useAuth";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const { dataDispatch } = useData();
  const [orders, setOrders] = useState([]);
  const [confirmed, setConfirmed] = useState(0);
  const [pending, setPending] = useState(0);
  const [amountQuoted, setAmountQuoted] = useState(0);
  const [amountPaid, setAmountPaid] = useState(0);
  const effectRan = useRef(false);
  let id = useAuth();
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_HOST}/client/orders/${id}`,
          {
            method: "GET",
            credentials: "include",
            mode: "cors",
          }
        );
        const data = await res.json();
        console.log(data);
        setOrders(data.orders);
        dataDispatch({ type: ACTIONS.ADD_ORDERS, orders: data.orders });
        if (data.orders.length) {
          let ordersArray = data.orders;
          for (let i = 0; i < ordersArray.length; i++) {
            let order = ordersArray[i].order;

            if (order.isConfirmed) {
              setConfirmed((prev) => prev + 1);
            } else {
              setPending((prev) => prev + 1);
            }
            setAmountQuoted((prev) => prev + order.amountQuoted);
            setAmountPaid((prev) => prev + order.amountPaid);
          }
        }

        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    };
    if (effectRan.current) {
      fetchOrders();
    }
    return () => {
      effectRan.current = true;
    };
  }, [id, dataDispatch]);

  if (loading) {
    return <Loader loading={loading} description="Please wait" />;
  }
  return (
    <div>
      <div className="mx-3 pt-3 lead text-muted">
        <span>Dashboard</span>
      </div>

      {orders.length > 0 && (
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
            </div>
            <div
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
            </div>
            <div
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
            </div>
          </div>
        </div>
      )}

      {!orders.length > 0 && (
        <div className="m-3 p-3 bg-white shadow-sm rounded lead text-center">
          <p> You have not placed any orders</p>
          <p>
            <Link to="/quote-form" className="text-decoration-none">
              Get Quote
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
