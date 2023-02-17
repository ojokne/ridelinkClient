import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Signup from "./pages/Signup";
import Order from "./pages/Order";
import Dashboard from "./pages/Dashboard";
import QuoteForm from "./pages/QuoteForm";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/quote-form" element={<QuoteForm />} />
        <Route path="/order" element={<Order />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="*" element={<p>Error page</p>} />
      </Routes>
    </div>
  );
}

export default App;
