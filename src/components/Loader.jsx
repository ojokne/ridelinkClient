import FadeLoader from "react-spinners/FadeLoader";
const override = {
  display: "block",
  margin: "0 auto",
};

const Loader = ({ loading, description }) => {
  return (
    <div className="centered">
      <FadeLoader
        color="#32a885"
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <h6 className="text-muted">{description}</h6>
    </div>
  );
};

export default Loader;
