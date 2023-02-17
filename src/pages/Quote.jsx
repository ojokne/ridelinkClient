import {
  FaRoad,
  FaMoneyBill,
  FaMapMarker,
  FaCalendarAlt,
} from "react-icons/fa";
import { useAuthentication, useQuote } from "../context/StateProvider";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACTIONS } from "../context/actions";
import Loader from "../components/Loader";
import useAuth from "../utils/useAuth";

const Quote = () => {
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
        setDistance(results.routes[0].legs[0].distance.text);
        setAmount(calculateAmount(results.routes[0].legs[0].distance.value));
      } catch (e) {
        console.log(e);
        setAlert((prev) => {
          return {
            ...prev,
            alert: true,
            message: " You could have entered a wrong location, please edit",
            class: "alert alert-warning alert-dismissible fade show",
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
          //   navigate("/login");
          setAlert((prev) => {
            return {
              ...prev,
              alert: true,
              message: "Order placed successfully",
              class: "alert alert-success alert-dismissible fade show",
            };
          });
          // quoteDispatch({ type: ACTIONS.CLEAR_QUOTE });
        } else {
          setAlert((prev) => {
            return {
              ...prev,
              alert: true,
              message: "Failed to place order",
              class: "alert alert-danger alert-dismissible fade show",
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
            class: "alert alert-danger alert-dismissible fade show",
          };
        });
      }
    } else {
      setAlert((prev) => {
        return {
          ...prev,
          alert: true,
          message: "You must be logged in to make an order",
          class: "alert alert-warning alert-dismissible fade show",
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
    <div className="container">
      <div
        className="mx-auto border rounded m-3 p-3"
        style={{ maxWidth: "500px" }}
      >
        {alert.alert && (
          <div className="m-3">
            <div className={alert.class} role="alert">
              {alert.message}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          </div>
        )}

        <div className="m-3 pb-3 border-bottom">
          <h4 className="text-muted">Distance</h4>
          <FaRoad className="ridelink-color" /> {distance}
        </div>

        <div className="m-3 pb-3 border-bottom">
          <h4 className="text-muted">Amount</h4>
          <FaMoneyBill className="ridelink-color" /> {amountQuoted} UGX
        </div>

        <div className="m-3 pb-3 border-bottom">
          <h4 className="text-muted">Schedule Date</h4>
          <FaCalendarAlt className="ridelink-color" /> {date}
        </div>

        <div className="m-3 pb-3 border-bottom">
          <h4 className="text-muted">Product</h4>
          {quote.productName}
        </div>
        <div className="m-3 pb-3 border-bottom">
          <h4 className="text-muted">Weight (Tonnes)</h4>

          {quote.productWeight}
        </div>
        <div className="m-3 pb-3 border-bottom">
          <h4 className="text-muted">Route</h4>
          <div className="d-flex flex-column">
            <span>
              <FaMapMarker className="ridelink-color" /> {quote.pickupLocation}
            </span>
            <span>
              <FaMapMarker style={{ color: "red" }} /> {quote.deliveryLocation}
            </span>
          </div>
        </div>

        {quote.deliveryInstructions && (
          <div className="m-3 pb-3 border-bottom">
            <h4 className="text-muted">Instructions</h4>

            {quote.deliveryInstructions}
          </div>
        )}
        <div className="m-3 d-flex justify-content-between">
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

export default Quote;
