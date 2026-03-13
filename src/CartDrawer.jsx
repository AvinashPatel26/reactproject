import React from "react";

function CartDrawer({ cartItems, onClose }) {

  return (

    <div className="cart-drawer">

      <div className="cart-header">
        <h3>Your Cart</h3>

        <button onClick={onClose}>✖</button>
      </div>

      {cartItems.map((item)=>(
        <div key={item._id} className="drawer-item">

          <img src={item.imageurl} alt={item.name} />

          <div>
            <p>{item.name}</p>
            <span>₹{item.price}</span>
          </div>

        </div>
      ))}

    </div>

  );

}

export default CartDrawer;