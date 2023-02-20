import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useOrders } from "../context/StateProvider";

const Confirmed = () => {
  const [delivered, setDelivered] = useState(0);
  const [confirmed, setConfirmed] = useState(0);
  const { orders } = useOrders();
  const navigate = useNavigate();

  useEffect(() => {
    if (orders[0].order?.amountQuoted) {
      for (let i = 0; i < orders.length; i++) {
        let order = orders[i].order;
        if (order.isConfirmed) {
          setConfirmed((prev) => prev + 1);
          if (order.trip) {
            setDelivered((prev) => prev + 1);
          }
        }
      }
    } else {
      navigate("/");
    }

    return () => {
      setConfirmed(0);
      setDelivered(0);
    };
  }, [orders, navigate]);
  return (
    <div>
      <div className="mx-3 pt-3 lead text-muted">
        <span>Confirmed Orders</span>
      </div>

      <div className="d-flex justify-content-center align-items-center flex-wrap">
        <div
          style={{ width: "367px" }}
          className="m-3 p-4 bg-white shadow-sm rounded"
        >
          <span className="text-muted" style={{ fontSize: "20px" }}>
            Confirmed
          </span>
          <div className="d-flex align-items-center">
            <span>
              <FaCheck
                className="icon iconMenu me-3"
                style={{ backgroundColor: "#ffc107" }}
              />
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
        </div>
      </div>
    </div>
  );
};
export default Confirmed;
