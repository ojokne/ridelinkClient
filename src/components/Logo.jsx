import logo from "../assets/img/logo.png";

const Logo = () => {
  return (
    <div>
      <img
        src={logo}
        alt="company logo"
        className="img-fluid mx-auto d-block mb-5"
      />
    </div>
  );
};

export default Logo;
