import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Home from "./Home";
import NonVeg from "./NonVeg";
import Veg from "./Veg";
import Milk from "./Milk";
import Chocolate from "./Chocolate";
import SignUp from "./SignUp";
import Cart from "./Cart";
import Orders from "./Orders";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import PageNotFound from "./PageNotFound";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

function AppLayout() {
  const cartItems = useSelector((state) => state.cart);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const auth = useSelector((state) => state.authentication);
  const user = auth.currentUser;
  const isAuthenticated = auth.isAuthenticated;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/home");
  };

  const navLinks = [
    { to: "/home", label: "Home" },
    { to: "/veg", label: "Veg" },
    { to: "/nonveg", label: "NonVeg" },
    { to: "/milk", label: "Milk" },
    { to: "/chocolate", label: "Chocolate" },
    { to: "/cart", label: "🛒 Cart", badge: cartCount },
    { to: "/orders", label: "Order" },
    { to: "/aboutus", label: "About Us" },
    { to: "/contactus", label: "Contact Us" },
  ];

  const closeNavbar = () => {
    const navbar = document.getElementById("navbarNav");
    if (navbar && navbar.classList.contains("show")) {
      new window.bootstrap.Collapse(navbar).hide();
    }
  };

  return (
    <div className="app-wrapper min-vh-100">
      <nav className="navbar navbar-expand-lg glass-navbar shadow-sm fixed-top">
        <div className="container-fluid">
          <span className="navbar-brand text-primary fw-bold">
            Food Sensations
          </span>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="navbar-nav ms-auto">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  className="nav-link nav-btn mx-2"
                  onClick={closeNavbar}
                >
                  {link.label}
                  {link.badge > 0 && (
                    <span className="badge bg-danger ms-1">{link.badge}</span>
                  )}
                </Link>
              ))}

              {!isAuthenticated ? (
                <Link
                  to="/signup"
                  className="nav-link nav-btn mx-2"
                  onClick={closeNavbar}
                >
                  🔑 SignUp
                </Link>
              ) : (
                <>
                  <span className="nav-link fw-bold text-success mx-2">
                    Welcome, {user?.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="btn btn-sm btn-outline-danger mx-2"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="page-container py-4" style={{ paddingTop: "80px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/nonveg" element={<NonVeg />} />
          <Route path="/veg" element={<Veg />} />
          <Route path="/milk" element={<Milk />} />
          <Route path="/chocolate" element={<Chocolate />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/signup"
            element={
              isAuthenticated ? <Navigate to="/home" replace /> : <SignUp />
            }
          />
          <Route path="/orders" element={<Orders />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
