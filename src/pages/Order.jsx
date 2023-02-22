import {
  FaTruckMoving,
  FaWeight,
  FaMapMarker,
  FaCalendarAlt,
  FaDollarSign,
  FaList,
} from "react-icons/fa";
import { useQuote } from "../context/StateProvider";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACTIONS } from "../context/actions";
import Loader from "../components/Loader";
import useAuth from "../utils/useAuth";

const Order = () => {
  const id = useAuth();
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
      return distance * 5;
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
  }, [quote, navigate, distance, amountQuoted]);

  const handleBack = () => {
    navigate("/quote-form");
  };

  const handleOrder = async () => {
    setLoading(true);
    if (id) {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_HOST}/client/order`,
          {
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
          }
        );
        const data = await res.json();
        console.log(data);
        setLoading(false);
        if (data.isCreated) {
          // navigate("/");
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
      } catch (e) {
        console.log(e);
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
            className="btn-close "
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}

      <div className="bg-white m-3 p-3 rounded shadow-sm">
        <div className="border-bottom p-3 d-flex justify-content-between">
          <div>
            <div>
              <span className="px-1 lead">{distance}</span>
              <span
                className="text-muted px-1"
                style={{ fontSize: ".7em", fontWeight: "lighter" }}
              >
                Km
              </span>
            </div>
            <span
              className="text-muted px-1"
              style={{ fontSize: ".7em", fontWeight: "lighter" }}
            >
              Distance
            </span>
          </div>
          <span>
            <FaTruckMoving className="icon" />
          </span>
        </div>
        <div className="border-bottom p-3 d-flex justify-content-between">
          <div>
            <div>
              <span
                className="text-muted"
                style={{ fontSize: ".7em", fontWeight: "lighter" }}
              >
                UGX
              </span>
              <span className="lead px-2">
                {amountQuoted.toLocaleString("en-US")}
              </span>
            </div>
            <span
              className="text-muted"
              style={{ fontSize: ".7em", fontWeight: "lighter" }}
            >
              Amount
            </span>
          </div>
          <span>
            <FaDollarSign className="icon" />
          </span>
        </div>

        <div className="border-bottom p-3 d-flex justify-content-between">
          <div>
            <div>
              <span className="lead">{quote.productWeight}</span>
              <span
                className="text-muted px-2"
                style={{ fontSize: ".7em", fontWeight: "lighter" }}
              >
                Tonnes
              </span>
            </div>
            <span
              className="text-muted"
              style={{ fontSize: ".7em", fontWeight: "lighter" }}
            >
              Weight
            </span>
          </div>
          <span>
            <FaWeight className="icon" />
          </span>
        </div>
        <div className="border-bottom p-3 d-flex justify-content-between">
          <div>
            <div>
              <span className="lead">{date}</span>
            </div>
            <span
              className="text-muted"
              style={{ fontSize: ".7em", fontWeight: "lighter" }}
            >
              Schedule Date
            </span>
          </div>
          <span>
            <FaCalendarAlt className="icon" />
          </span>
        </div>

        <div className="border-bottom p-3 d-flex justify-content-between">
          <div>
            <div>
              <span className="lead">{quote.pickupLocation}</span>
            </div>
            <span
              className="text-muted"
              style={{ fontSize: ".7em", fontWeight: "lighter" }}
            >
              Pick up
            </span>
          </div>
          <span>
            <FaMapMarker className="icon" />
          </span>
        </div>
        <div className="border-bottom p-3 d-flex justify-content-between">
          <div>
            <div>
              <span className="lead">{quote.deliveryLocation}</span>
            </div>
            <span
              className="text-muted"
              style={{ fontSize: ".7em", fontWeight: "lighter" }}
            >
              Drop off
            </span>
          </div>
          <span>
            <FaMapMarker
              className="icon"
              style={{ backgroundColor: "brown" }}
            />
          </span>
        </div>
        {quote.deliveryInstructions && (
          <div className="p-3 d-flex justify-content-between">
            <div>
              <div>
                <span className="lead">{quote.deliveryInstructions}</span>
              </div>
              <span
                className="text-muted"
                style={{ fontSize: ".7em", fontWeight: "lighter" }}
              >
                Delivery Instructions
              </span>
            </div>
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
