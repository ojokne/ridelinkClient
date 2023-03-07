import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Signup from "./pages/Signup";
import Order from "./pages/Order";
import Home from "./pages/Home";
import Quote from "./pages/Quote";
import Dashboard from "./components/Dashboard";
import Confirmed from "./components/Confirmed";
import Pending from "./components/Pending";

function App() {
  return (
    <div>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="quote" element={<Quote />} />
        <Route path="order" element={<Order />} />
        <Route element={<ProtectedRoutes />}></Route>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="confirmed" element={<Confirmed />} />
          <Route path="pending" element={<Pending />} />
        </Route>
        <Route path="*" element={<p>Error page</p>} />
      </Routes>
    </div>
  );
}

export default App;
