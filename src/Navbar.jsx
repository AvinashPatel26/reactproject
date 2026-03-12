import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Navbar.css";

function Navbar() {

  const cartItems = useSelector((state)=>state.cart);

  const totalItems = cartItems.reduce(
    (sum,item)=>sum+item.quantity,
    0
  );

  return (
    <nav className="navbar-custom">

      <div className="nav-logo">
        FoodSensations 🍴
      </div>

      <div className="nav-links">

        <Link to="/veg">Veg</Link>

        <Link to="/nonveg">NonVeg</Link>

        <Link to="/milk">Milk</Link>

        <Link to="/chocolate">Chocolate</Link>

      </div>

      <Link to="/cart" className="cart-link">

        🛒 Cart

        {totalItems>0 && (
          <span className="cart-badge">
            {totalItems}
          </span>
        )}

      </Link>

    </nav>
  );
}

export default Navbar;