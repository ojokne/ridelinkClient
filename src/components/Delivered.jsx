import { Link } from "react-router-dom";
import { FaTimes, FaTruckMoving } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useOrders } from "../context/StateProvider";

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

const Delivered = () => {
  const [delivered, setDelivered] = useState([]);
  const { orders } = useOrders();

  useEffect(() => {
    for (let i = 0; i < orders.orders.length; i++) {
      let order = orders.orders[i];
      if (order.isConfirmed && order.isDelivered) {
        let amountQuoted = Number(order.amountQuoted).toLocaleString("en-Us");
        let date = new Date(order.scheduleDate).toDateString();
        let obj = {
          amountQuoted,
          date,
          id: order.id,
          productName: order.productName,
          productWeight: order.productWeight,
          pickupLocation: order.pickupLocation,
          deliveryLocation: order.deliveryLocation,
          deliveryInstructions: order.deliveryInstructions,
        };
        setDelivered((prev) => {
          return [...prev, obj];
        });
      }
    }
  }, [orders]);
  return (
    <div>
      <div className="mx-3 pt-3 lead text-muted d-flex justify-content-between align-items-center">
        <span>Delivered</span>

        <span>
          <Link to="/confirmed" className="text-decoration-none ridelink-color">
            <FaTimes
              className="icon iconSmall me-3"
              style={{ backgroundColor: "red" }}
            />
          </Link>
        </span>
      </div>
      <div className="d-flex flex-row flex-wrap">
        {delivered.map((order, index) => {
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
                <div className="d-flex flex-column my-2">
                  <span className="text-danger px-1">{order.id}</span>
                  <span
                    style={{ fontSize: ".6em", fontWeight: "lighter" }}
                    className="px-1"
                  >
                    Order Number
                  </span>
                </div>
                <div className="d-flex flex-column my-2">
                  <span className="px-1 text-muted">{order.productName}</span>
                  <span
                    className="px-1"
                    style={{ fontSize: ".6em", fontWeight: "lighter" }}
                  >
                    Product Name
                  </span>
                </div>

                <div className="d-flex flex-column my-2">
                  <div>
                    <span
                      className="px-1"
                      style={{ fontSize: ".6em", fontWeight: "lighter" }}
                    >
                      UGX
                    </span>
                    <span className="text-muted">{order.amountQuoted}</span>
                  </div>
                  <span
                    className="px-1"
                    style={{ fontSize: ".6em", fontWeight: "lighter" }}
                  >
                    Amount
                  </span>
                </div>
                <div className="d-flex flex-column my-2">
                  <div>
                    <span className="text-muted">{order.productWeight}</span>
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
      <div className="m-3">
        <Link to="/confirmed" className="text-decoration-none ridelink-color">
          Return to confirmed Orders
        </Link>
      </div>
    </div>
  );
};

export default Delivered;
