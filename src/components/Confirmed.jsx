import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useData } from "../context/StateProvider";
import { Link } from "react-router-dom";

const Confirmed = () => {
  const [delivered, setDelivered] = useState(0);
  const [confirmed, setConfirmed] = useState(0);
  const { data } = useData();
  const navigate = useNavigate();
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    if (data.hasOwnProperty("data")) {
      if (data.data.length) {
        for (let i = 0; i < data.data.length; i++) {
          let order = data.data[i].order;
          if (order.isConfirmed) {
            setConfirmed((prev) => prev + 1);
            if (order.trip) {
              setDelivered((prev) => prev + 1);
            }
          }
        }
        setDisplay(true);
      }
    }
  }, [data, navigate]);
  return (
    <div>
      <div className="mx-3 pt-3 lead text-muted">
        <span>Confirmed Orders</span>
      </div>
      {display && (
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
