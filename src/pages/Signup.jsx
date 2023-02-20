import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Logo from "../components/Logo";

const Signup = () => {
  const showPasswordRef = useRef();
  const nameRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [alert, setAlert] = useState({
    alert: false,
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e, name, phone, email, password) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_HOST}/client/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            phoneNumber: phone,
            email,
            password,
            role: 2,
          }),
          credentials: "include",
        }
      );
      const data = await res.json();
      setLoading(false);

      if (data.isCreated) {
        navigate("/login");
        setAlert((prev) => {
          return { ...prev, alert: false, message: "" };
        });
      } else {
        setAlert((prev) => {
          return { ...prev, alert: true, message: data.msg };
        });
      }
    } catch {
      console.log("An error occured");
      setAlert((prev) => {
        return {
          ...prev,
          alert: true,
          message: "An error occurred, Please try again",
        };
      });
    }
  };
  const handleShowPassword = () => {
    let passwordField = passwordRef.current;
    if (passwordField.type === "password") {
      passwordField.type = "text";
    } else {
      passwordField.type = "password";
    }
  };
  if (loading) {
    return (
      <Loader
        loading={loading}
        description="We are creating you account, please wait"
      />
    );
  }

  return (
    <div className="mx-auto" style={{ maxWidth: "500px" }}>
      <div className="bg-white rounded  shadow-sm m-3 p-3">
        <Logo />
        {alert.alert && (
          <div className="mx-auto">
            <div
              className="alert alert-danger alert-dismissible fade show"
              role="alert"
            >
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

        <div className="mx-auto">
          <p className="text-center text-muted">Please give us your details</p>

          <form>
            <div className="m-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="John Doe"
                ref={nameRef}
                required
              />
            </div>
            <div className="m-3">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                placeholder="+256 712345678"
                ref={phoneRef}
                required
              />
            </div>
            <div className="m-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                ref={emailRef}
                placeholder="oen@example.com"
                required
              />
            </div>
            <div className="m-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                ref={passwordRef}
                required
              />
            </div>
            <div className="m-3 form-check">
              <input
                ref={showPasswordRef}
                type="checkbox"
                className="form-check-input"
                id="showPassword"
                onChange={() => handleShowPassword()}
              />
              <label className="form-check-label" htmlFor="showPassword">
                show password
              </label>
            </div>
            <button
              type="submit"
              className="m-3 btn ridelink-background text-white "
              onClick={(e) =>
                handleSignup(
                  e,
                  nameRef.current.value,
                  phoneRef.current.value,
                  emailRef.current.value,
                  passwordRef.current.value
                )
              }
            >
              Create my account
            </button>
          </form>
          <div className="mt-3">
            <Link to="/login" className="text-decoration-none ridelink-color">
              Login to my account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
