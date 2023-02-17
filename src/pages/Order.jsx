import {
  FaTruckMoving,
  FaWeight,
  FaMapMarker,
  FaCalendarAlt,
  FaDollarSign,
  FaList,
} from "react-icons/fa";
import { useAuthentication, useQuote } from "../context/StateProvider";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACTIONS } from "../context/actions";
import Loader from "../components/Loader";
import useAuth from "../utils/useAuth";

const Order = () => {
  useAuth();
  const { auth } = useAuthentication();
  const navigate = useNavigate();
  const { quote, quoteDispatch } = useQuote();
  const [amountQuoted, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    alert: false,
    message: "",
    type: "",
  });

  const date = new Date(quote.proposedScheduleDate).toDateString();

  // eslint-disable-next-line
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState();

  useEffect(() => {
    const calculateAmount = (distance) => {
      return (distance * 5).toLocaleString("en-US");
    };
    const calculateRoute = async () => {
      try {
        // eslint-disable-next-line
        const directionsService = new google.maps.DirectionsService();
        const results = await directionsService.route({
          origin: quote.pickupLocation,
          destination: quote.deliveryLocation,

          // eslint-disable-next-line
          travelMode: google.maps.TravelMode.DRIVING,
        });
        setDirectionsResponse(results);
        setDistance(results.routes[0].legs[0].distance.value / 1000);
        setAmount(calculateAmount(results.routes[0].legs[0].distance.value));
      } catch (e) {
        console.log(e);
        setAlert((prev) => {
          return {
            ...prev,
            alert: true,
            message: " You could have entered a wrong location, please edit",
            class: "alert alert-warning alert-dismissible fade show m-3 p-3",
          };
        });
      }
    };
    if (
      !quote.hasOwnProperty("pickupLocation") ||
      !quote.hasOwnProperty("deliveryLocation")
    ) {
      navigate("/quote-form");
    }
    calculateRoute();
  }, [quote, navigate, distance]);

  const handleBack = () => {
    navigate("/quote-form");
  };

  const handleOrder = async () => {
    setLoading(true);
    if (auth.isAuthenticated && auth.id) {
      try {
        const res = await fetch("http://localhost:5000/client/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productName: quote.productName,
            productWeight: quote.productWeight,
            proposedScheduleDate: quote.proposedScheduleDate,
            amountQuoted: amountQuoted,
            pickupLocation: quote.pickupLocation,
            deliveryLocation: quote.deliveryLocation,
            deliveryInstructions: quote.deliveryInstructions,
          }),
          credentials: "include",
        });
        const data = await res.json();
        setLoading(false);
        if (data.isCreated) {
          navigate("/dashboard");
          setAlert((prev) => {
            return {
              ...prev,
              alert: true,
              message: "Order placed successfully",
              class: "alert alert-success alert-dismissible fade show m-3 p-3",
            };
          });
          quoteDispatch({ type: ACTIONS.CLEAR_QUOTE });
        } else {
          setAlert((prev) => {
            return {
              ...prev,
              alert: true,
              message: "Failed to place order",
              class: "alert alert-danger alert-dismissible fade show m-3 p-3",
            };
          });
        }
      } catch {
        console.log("An error occured");
        setAlert((prev) => {
          return {
            ...prev,
            alert: true,
            message: "An error occurred, Please try again",
            class: "alert alert-danger alert-dismissible fade show m-3 p-3",
          };
        });
      }
    } else {
      setAlert((prev) => {
        return {
          ...prev,
          alert: true,
          message: "You must be logged in to make an order",
          class: "alert alert-warning alert-dismissible fade show m-3 p-3",
        };
      });
    }
  };

  if (loading) {
    return (
      <Loader
        loading={loading}
        description="We are processing your order, please wait"
      />
    );
  }

  return (
    <div className="mx-auto" style={{ maxWidth: "600px" }}>
      {alert.alert && (
        <div className={alert.class} role="alert">
          {alert.message}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}

      <div className="bg-white m-3 p-3 rounded shadow-sm">
        <div className="border-bottom p-3 d-flex justify-content-between">
          <p style={{ fontSize: "1.8em", fontWeight: "lighter" }}>
            {distance}
            <span className="text-muted px-2" style={{ fontSize: "0.5em" }}>
              Km
            </span>
            <span
              className="text-muted"
              style={{ fontSize: ".8rem", display: "block" }}
            >
              Distance
            </span>
          </p>
          <span>
            <FaTruckMoving className="icon" />
          </span>
        </div>
        <div className="border-bottom p-3 d-flex justify-content-between">
          <p style={{ fontSize: "1.8em", fontWeight: "lighter" }}>
            <span className="text-muted" style={{ fontSize: "0.5em" }}>
              UGX
            </span>
            <span className="px-2">{amountQuoted}</span>
            <span
              className="text-muted"
              style={{ fontSize: ".8rem", display: "block" }}
            >
              Amount
            </span>
          </p>
          <span>
            <FaDollarSign className="icon" />
          </span>
        </div>

        <div className="border-bottom p-3 d-flex justify-content-between">
          <p style={{ fontSize: "1.8em", fontWeight: "lighter" }}>
            {quote.productWeight}
            <span className="text-muted px-2" style={{ fontSize: "0.5em" }}>
              Tonnes
            </span>
            <span
              className="text-muted"
              style={{ fontSize: ".8rem", display: "block" }}
            >
              Weight
            </span>
          </p>
          <span>
            <FaWeight className="icon" />
          </span>
        </div>
        <div className="border-bottom p-3 d-flex justify-content-between">
          <p style={{ fontSize: "1.5em", fontWeight: "lighter" }}>
            {date}
            <span
              className="text-muted"
              style={{ fontSize: ".8rem", display: "block" }}
            >
              Schedule Date
            </span>
          </p>
          <span>
            <FaCalendarAlt className="icon" />
          </span>
        </div>

        <div className="border-bottom p-3 d-flex justify-content-between">
          <p style={{ fontSize: "1.5em", fontWeight: "lighter" }}>
            {quote.pickupLocation}
            <span
              className="text-muted"
              style={{ fontSize: ".8rem", display: "block" }}
            >
              Pick up
            </span>
          </p>
          <span>
            <FaMapMarker className="icon" />
          </span>
        </div>
        <div className="border-bottom p-3 d-flex justify-content-between">
          <p style={{ fontSize: "1.5em", fontWeight: "lighter" }}>
            {quote.deliveryLocation}
            <span
              className="text-muted"
              style={{ fontSize: ".8rem", display: "block" }}
            >
              Drop off
            </span>
          </p>
          <span>
            <FaMapMarker
              className="icon"
              style={{ backgroundColor: "brown" }}
            />
          </span>
        </div>
        {quote.deliveryInstructions && (
          <div className="p-3 d-flex justify-content-between">
            <p style={{ fontSize: "1.5em", fontWeight: "lighter" }}>
              {quote.deliveryInstructions}
              <span
                className="text-muted"
                style={{ fontSize: ".8rem", display: "block" }}
              >
                Delivery Instructions
              </span>
            </p>
            <span>
              <FaList className="icon" />
            </span>
          </div>
        )}
        <div className="d-flex justify-content-between p-3">
          <button
            className="btn btn-outline-success"
            onClick={() => handleBack()}
          >
            Edit
          </button>
          <button
            className="btn ridelink-background text-white"
            onClick={() => handleOrder()}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;
