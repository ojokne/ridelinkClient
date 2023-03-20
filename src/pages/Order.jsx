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
import { Link, useNavigate } from "react-router-dom";
import { ACTIONS } from "../context/actions";
import Loader from "../components/Loader";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore";

const Order = () => {
  const navigate = useNavigate();
  const { quote, quoteDispatch } = useQuote();
  const [amountQuoted, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [alert, setAlert] = useState({
    alert: false,
    message: "",
    type: "",
  });

  const date = new Date(quote.proposedScheduleDate).toDateString();

  // eslint-disable-next-line
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState();
  const orderCollectionRef = collection(db, "eOrders");

  useEffect(() => {
    const calculateAmount = (distance) => {
      return distance * 5;
    };
    const calculateRoute = async () => {
      setLoading(true);
      setDescription("We are generating quote, please wait");
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
        setLoading(false);
        setDescription("");
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
      navigate("/quote");
    }
    calculateRoute();
  }, [quote, navigate, distance, amountQuoted]);

  const handleBack = () => {
    navigate("/quote");
  };

  const handleOrder = () => {
    setLoading(true);
    setAlert((prev) => {
      return {
        ...prev,
        alert: false,
        message: "",
        class: "",
      };
    });
    setDescription("We are processing your order, please wait");

    onAuthStateChanged(auth, (user) => {
      if (!user) {
        setAlert((prev) => {
          return {
            ...prev,
            alert: true,
            message: (
              <div className="">
                <span>Please </span>
                <Link
                  to="/login"
                  className="text-decoration-none ridelink-color"
                >
                  Login
                </Link>
                <span> to make an order</span>
              </div>
            ),
            class: "alert alert-warning alert-dismissible fade show m-3 p-3",
          };
        });
        setLoading(false);
      } else {
        addDoc(orderCollectionRef, {
          clientId: auth.currentUser.uid,
          productName: quote.productName,
          productWeight: quote.productWeight,
          scheduleDate: quote.proposedScheduleDate,
          amountQuoted: amountQuoted,
          pickupLocation: quote.pickupLocation,
          deliveryLocation: quote.deliveryLocation,
          deliveryInstructions: quote.deliveryInstructions,
          isConfirmed: false,
          isLoaded: false,
          isDelivered: false,
          orderPlacedAt: new Date().getTime(),
        })
          .then((res) => {
            quoteDispatch({ type: ACTIONS.CLEAR_QUOTE });
            navigate("/");
            setLoading(false);
          })
          .catch((e) => {
            console.log(e);
            setAlert((prev) => {
              return {
                ...prev,
                alert: true,
                message: "Failed to place order",
                class: "alert alert-danger alert-dismissible fade show m-3 p-3",
              };
            });
          });
      }
    });
  };

  if (loading) {
    return <Loader loading={loading} description={description} />;
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
