import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { useQuote } from "../context/StateProvider";
import { ACTIONS } from "../context/actions";
import Loader from "../components/Loader";
import Logo from "../components/Logo";

const QuoteForm = () => {
  const navigate = useNavigate();
  const [libraries] = useState(["places"]);
  const { quote, quoteDispatch } = useQuote();

  const [productWeight, setProductWeight] = useState(quote.productWeight);
  const [productName, setProductName] = useState(quote.productName);
  const [scheduleDate, setScheduleDate] = useState(quote.proposedScheduleDate);
  const [deliveryInstructions, setDeliveryInstructions] = useState(
    quote.deliveryInstructions
  );

  const pickupLocationRef = useRef();
  const deliveryLocationRef = useRef();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const handleOrder = async (e) => {
    e.preventDefault();
    let obj = {
      productName,
      productWeight,
      proposedScheduleDate: scheduleDate,
      pickupLocation: pickupLocationRef.current.value,
      deliveryLocation: deliveryLocationRef.current.value,
      deliveryInstructions,
    };

    quoteDispatch({ type: ACTIONS.ADD_QUOTE, quote: obj });

    navigate("/order");
  };
  if (!isLoaded) {
    return <Loader loading={!isLoaded} description="Loading" />;
  }
  return (
    <div>
      <div
        className="mx-auto bg-white rounded shadow-sm m-3 p-3"
        style={{ maxWidth: "600px" }}
      >
        <Logo />
        <form>
          <p className="text-center text-muted m-3 p-3">
            Please fill in the form below to get a quote
          </p>
          <div className="m-3">
            <label htmlFor="name" className="form-label">
              Product Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              placeholder="Cement"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div className="m-3">
            <label htmlFor="weight" className="form-label">
              Weight (Tonnes)
            </label>
            <input
              type="number"
              className="form-control"
              id="weight"
              required
              placeholder="Weight"
              min={0}
              value={productWeight}
              onChange={(e) => setProductWeight(e.target.value)}
            />
          </div>
          <div className="m-3">
            <label htmlFor="scheduleDate" className="form-label">
              Schedule Date
            </label>
            <input
              type="date"
              className="form-control"
              id="scheduleDate"
              required
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e.target.value)}
            />
          </div>
          <div className="m-3">
            <label htmlFor="pickup" className="form-label">
              Pick up
            </label>
            <Autocomplete>
              <input
                type="text"
                className="form-control"
                id="pickup"
                required
                placeholder="Mombasa"
                ref={pickupLocationRef}
              />
            </Autocomplete>
          </div>
          <div className="m-3">
            <label htmlFor="delivery" className="form-label">
              Drop off
            </label>
            <Autocomplete>
              <input
                type="text"
                className="form-control"
                id="delivery"
                required
                placeholder="Kampala"
                ref={deliveryLocationRef}
              />
            </Autocomplete>
          </div>
          <div className="m-3">
            <label htmlFor="instructions">Delivery Instructions if any</label>
            <textarea
              className="form-control"
              id="instructions"
              rows="3"
              placeholder="Come for pickup by 10 pm"
              value={deliveryInstructions}
              onChange={(e) => setDeliveryInstructions(e.target.value)}
            ></textarea>
          </div>
          <button
            type="submit"
            className="m-3 btn ridelink-background text-white"
            onClick={(e) => handleOrder(e)}
          >
            Get Quote
          </button>
        </form>
        <div className="m-3">
          <Link to="/" className="text-decoration-none ridelink-color">
            My account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuoteForm;
