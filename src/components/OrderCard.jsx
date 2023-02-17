import {
  FaTruckMoving,
  FaChevronRight,
  FaClock,
  FaCheck,
} from "react-icons/fa";

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
  iconSmall: {
    color: "white",
    backgroundColor: "#32a885",
    opacity: 0.8,
    fontSize: "1.3em",
    padding: "6px",
    margin: "6px",
    borderRadius: "50%",
  },

  iconPending: {
    color: "white",
    backgroundColor: "#ffc107",
    opacity: 0.8,
    fontSize: "22px",
    padding: "6px",
    margin: "6px",
    borderRadius: "50%",
  },
};

const OrderCard = ({ order }) => {
  const amount = Number(order.amountQuoted).toLocaleString("en-US");
  const date = new Date(order.proposedScheduleDate).toDateString();
  const status =
    order?.trip ?? false ? (
      <span>
        <FaCheck style={styles.iconSmall} />
        <span style={{ fontSize: ".8em", fontWeight: "lighter" }}>
          Confirmed
        </span>
      </span>
    ) : (
      <span>
        <FaClock style={styles.iconPending} />
        <span
          className="px-1"
          style={{ fontSize: ".8em", fontWeight: "lighter" }}
        >
          Pending Confirmation
        </span>
      </span>
    );
  return (
    <div className="border-bottom py-3 d-flex justify-content-between order-card">
      <div className="d-flex flex-column justify-content-between">
        <div className="d-flex flex-row justify-content-between">
          <span>
            <FaTruckMoving style={styles.iconLarge} />
          </span>
          <div className="d-flex flex-column justify-content-between">
            <span
              className="px-1 text-muted"
              style={{ fontSize: "1.5em", fontWeight: "normal" }}
            >
              {order.productName}
            </span>
            <span
              className="px-1"
              style={{ fontSize: ".8em", fontWeight: "lighter" }}
            >
              {date}
            </span>
            {status}
          </div>
        </div>
      </div>
      <div className="d-flex flex-row justify-content-between">
        <div>
          <p
            style={{ fontSize: "1.5em", fontWeight: "normal" }}
            className="text-muted"
          >
            <span className="px-1" style={{ fontSize: "0.5em" }}>
              UGX
            </span>
            <span>{amount}</span>
          </p>
        </div>
        <span className="align-self-center">
          <FaChevronRight style={styles.iconSmall} />
        </span>
      </div>
    </div>
  );
};
export default OrderCard;
