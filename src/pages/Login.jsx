import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const showPasswordRef = useRef();
  const passwordRef = useRef();

  const [alert, setAlert] = useState({
    alert: false,
    message: "",
  });

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleShowPassword = () => {
    let passwordField = passwordRef.current;
    if (passwordField.type === "password") {
      passwordField.type = "text";
    } else {
      passwordField.type = "password";
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAlert((prev) => {
      return { ...prev, alert: false, message: "" };
    });
    if (!email.length) {
      setEmailError("Email cannot be empty");
      return;
    }

    if (password.length < 6) {
      setPasswordError("Password should be atleast 6 characters");
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
      let code = e.code;
      switch (code) {
        case "auth/invalid-email":
          setAlert((prev) => {
            return { ...prev, alert: true, message: "No user with than Email" };
          });
          break;

        case "auth/wrong-password":
          setAlert((prev) => {
            return { ...prev, alert: true, message: "Password incorrect" };
          });
          break;

        case "auth/user-not-found":
          setAlert((prev) => {
            return {
              ...prev,
              alert: true,
              message: "Incorrect email or password",
            };
          });
          break;
        default:
          setAlert((prev) => {
            return {
              ...prev,
              alert: true,
              message: "An error occured",
            };
          });
      }
    }
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      }
      setLoading(false);
    });
  }, [navigate]);

  if (loading) {
    return <Loader loading={loading} description="Please wait" />;
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
        <p className="text-center text-muted">Welcome Back, please login</p>
        <form>
          <div className="m-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              required
              placeholder="oen@gmail.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
            />
            {emailError && (
              <div
                className="text-danger small my-2"
                style={{ fontSize: ".6em" }}
              >
                <span>{emailError}</span>
              </div>
            )}
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
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
              required
            />
            {passwordError && (
              <div
                className="text-danger small my-2 muted"
                style={{ fontSize: ".6em" }}
              >
                <span>{passwordError}</span>
              </div>
            )}
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
            className="m-3 btn ridelink-background text-white  "
            onClick={(e) => handleLogin(e)}
          >
            Login
          </button>
        </form>

        <div className="mt-3">
          <Link to="/signup" className="text-decoration-none ridelink-color">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
