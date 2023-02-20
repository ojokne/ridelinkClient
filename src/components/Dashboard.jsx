import { useEffect, useRef, useState } from "react";
import { FaCheck, FaClock, FaDollarSign } from "react-icons/fa";
import { useAuthentication, useOrders } from "../context/StateProvider";

import { ACTIONS } from "../context/actions";
import Loader from "./Loader";
const { auth } = useAuthentication();
const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const { auth } = useAuthentication();
  const { orders, ordersDispatch } = useOrders();
  const [confirmed, setConfirmed] = useState(0);
  const [amount, setAmount] = useState(0);
  const effectRan = useRef(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_HOST}/client/orders/${auth.id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await res.json();
        ordersDispatch({ type: ACTIONS.ADD_ORDERS, orders: data.orders });
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    };
    if (!effectRan.current) {
      fetchOrders();
      return () => {
        effectRan.current = true;

        ordersDispatch({ type: ACTIONS.CLEAR_ORDERS });
      };
    }
    for (let i = 0; i < orders.length; i++) {
      let order = orders[i];
      if (order.isConfirmed) {
        setConfirmed((prev) => prev + 1);
      }
      setAmount((prev) => prev + (order?.amountPaid ?? 0));
    }
  }, [auth.id, orders, ordersDispatch]);

  if (loading) {
    return <Loader loading={loading} description="Please wait" />;
  }
  return (
    <div>
      <div className="mx-3 pt-3 lead text-muted">
        <span>Dashboard</span>
      </div>
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
              {orders.length - confirmed}
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
            Amount Spent
          </span>
          <div className="d-flex align-items-center">
            <span>
              <FaDollarSign className="icon iconMenu me-3" />
            </span>
            <span className="me-3" style={{ fontSize: "30px" }}>
              {amount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
