import { useEffect, useState } from "react";
import { FaTruckMoving } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useData } from "../context/StateProvider";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import Loader from "./Loader";

const styles = {
  iconLarge: {
    color: "white",
    backgroundColor: "#32a885",
    opacity: 0.8,
    fontSize: "3em",
    padding: "6px",
    margin: "6px",
    borderRadius: "50%",
  },
};

const Pending = () => {
  const { data } = useData();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [display, setDisplay] = useState(false);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (data.hasOwnProperty("data")) {
  //     if (data.data.length) {
  //       for (let i = 0; i < data.data.length; i++) {
  //         let order = data.data[i].order;
  //         if (!order.isConfirmed) {
  //           let amountQuoted = Number(order.amountQuoted).toLocaleString(
  //             "en-Us"
  //           );
  //           let date = new Date(order.proposedScheduleDate).toDateString();
  //           let obj = {
  //             proposedScheduleDate: order.proposedScheduleDate,
  //             amountQuoted,
  //             date,
  //             id: order.id,
  //             productName: order.productName,
  //             productWeight: order.productWeight,
  //             pickupLocation: order.pickupLocation,
  //             deliveryLocation: order.deliveryLocation,
  //             deliveryInstructions: order.deliveryInstructions,
  //           };
  //           setOrders((prev) => [...prev, obj]);
  //         }
  //       }
  //       setDisplay(true);
  //     }
  //   }
  //   return () => {
  //     setOrders([]);
  //   };
  // }, [data]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (!user) {
        navigate("/login");
      }
    });
  }, [navigate]);
  if (loading) {
    return <Loader loading={loading} description="Please wait" />;
  }
  return (
    <div>
      <div className="mx-3 pt-3 lead text-muted">
        <span>Pending Orders</span>
      </div>

      {display && (
        <div className="d-flex flex-row flex-wrap">
          {orders.map((order, index) => {
            return (
              <div
                className="d-flex flex-row m-3 p-4 bg-white shadow-sm rounded"
                style={{ width: "367px" }}
                key={index}
              >
                <span>
                  <FaTruckMoving style={styles.iconLarge} />
                </span>
                <div className="d-flex flex-column">
                  <div className="d-flex flex-row justify-content-between">
                    <div className="d-flex flex-column">
                      <span className="px-1 text-muted">
                        {order.productName}
                      </span>
                      <span
                        className="px-1"
                        style={{ fontSize: ".6em", fontWeight: "lighter" }}
                      >
                        Product Name
                      </span>
                    </div>
                    <div className="d-flex flex-column">
                      <span className="text-danger px-1">{order.id}</span>
                      <span
                        style={{ fontSize: ".6em", fontWeight: "lighter" }}
                        className="px-1"
                      >
                        Order Number
                      </span>
                    </div>
                  </div>
                  <div className="d-flex flex-column my-2">
                    <div className="d-flex flex-row justify-content-between">
                      <div className="d-flex flex-column">
                        <div>
                          <span
                            className="px-1"
                            style={{ fontSize: ".6em", fontWeight: "lighter" }}
                          >
                            UGX
                          </span>
                          <span className="text-muted">
                            {order.amountQuoted}
                          </span>
                        </div>
                        <span
                          className="px-1"
                          style={{ fontSize: ".6em", fontWeight: "lighter" }}
                        >
                          Amount
                        </span>
                      </div>
                      <div className="d-flex flex-column px-3">
                        <div>
                          <span className="text-muted">
                            {order.productWeight}
                          </span>
                          <span
                            className=""
                            style={{ fontSize: ".6em", fontWeight: "lighter" }}
                          >
                            Tonnes
                          </span>
                        </div>
                        <span
                          className=""
                          style={{ fontSize: ".6em", fontWeight: "lighter" }}
                        >
                          Weight
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex flex-column my-2">
                    <span className="px-1 text-muted">{order.date}</span>
                    <span
                      className="px-1"
                      style={{ fontSize: ".6em", fontWeight: "lighter" }}
                    >
                      Proposed Date
                    </span>
                  </div>
                  <div className="d-flex flex-column my-2">
                    <span className="px-1 text-muted">
                      {order.pickupLocation}
                    </span>
                    <span
                      className="px-1"
                      style={{ fontSize: ".6em", fontWeight: "lighter" }}
                    >
                      Pick up
                    </span>
                  </div>
                  <div className="d-flex flex-column my-2">
                    <span className="px-1 text-muted">
                      {order.deliveryLocation}
                    </span>
                    <span
                      className="px-1"
                      style={{ fontSize: ".6em", fontWeight: "lighter" }}
                    >
                      Drop off
                    </span>
                  </div>
                  {order.deliveryInstructions && (
                    <div className="d-flex flex-column my-2">
                      <span className="px-1 text-muted">
                        {order.deliveryInstructions}
                      </span>
                      <span
                        className="px-1"
                        style={{ fontSize: ".6em", fontWeight: "lighter" }}
                      >
                        Instrutctions
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
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
export default Pending;
