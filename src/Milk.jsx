import { useDispatch, useSelector } from "react-redux";
import { addToCart, increaseItem, decreaseItem } from "./store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Milk.css";
import { useState } from "react";

function Milk() {
  const milkMenu = useSelector((state) => state.products.milk);
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const getCartItem = (id) => cartItems.find((item) => item.id === id);

  const notifyAdd = (itemName) =>
    toast.success(`${itemName} added to cart!`, {
      autoClose: 2000,
      style: { backgroundColor: "#627d98", color: "#fff", fontWeight: "bold" },
      theme: "colored",
    });
  const notifyIncrease = (itemName) =>
    toast.info(`Increased ${itemName} quantity!`, { autoClose: 2000 });
  const notifyDecrease = (itemName) =>
    toast.info(`Decreased ${itemName} quantity!`, { autoClose: 2000 });

  const itemsPerPage = 4;
  const totalPages = Math.ceil(milkMenu.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = milkMenu.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="container milkPage-bg p-4 my-4 rounded">
      <h1 className="milkPage-heading text-center mb-3">🥛 Fresh Milk Products</h1>
      <p className="milkPage-subtitle text-center text-muted mb-4">
        Creamy, fresh dairy items just for you
      </p>

      <div className="row">
        {currentItems.length > 0 ? (
          currentItems.map((item, idx) => {
            const cartItem = getCartItem(item.id);

            return (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={item.id}>
                <div className={`card milkPage-card h-100 card-${idx + 1}`}>
                  <img
                    src={item.imageurl}
                    alt={item.name}
                    className="card-img-top milkPage-img"
                  />
                  <div className="card-body d-flex flex-column">
                    <h6 className="milkPage-name mb-1">{item.name}</h6>
                    <p className="milkPage-desc small mb-2">{item.description}</p>
                    <p className="milkPage-price-amount fw-bold mb-3">₹{item.price}</p>

                    <div className="mt-auto d-flex gap-2 align-items-center justify-content-center">
                      {!cartItem ? (
                        <button
                          className="milkPage-btn-add"
                          onClick={() => {
                            dispatch(addToCart({ ...item, quantity: 1 }));
                            notifyAdd(item.name);
                          }}
                        >
                          🛒 Add to Cart
                        </button>
                      ) : (
                        <div className="milkPage-counter d-flex align-items-center gap-3">
                          <button
                            className="milkPage-btn-counter"
                            onClick={() => {
                              dispatch(decreaseItem(item));
                              notifyDecrease(item.name);
                            }}
                          >
                            −
                          </button>
                          <span className="milkPage-quantity">{cartItem.quantity}</span>
                          <button
                            className="milkPage-btn-counter"
                            onClick={() => {
                              dispatch(increaseItem(item));
                              notifyIncrease(item.name);
                            }}
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-muted text-center">No milk items available.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="d-flex justify-content-center mt-3">
          <ul className="pagination milkPage-pagination">
            <li className="page-item">
              <button
                className="page-link milkPage-page-btn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>

            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index + 1}
                className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
              >
                <button
                  className="page-link milkPage-page-btn"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}

            <li className="page-item">
              <button
                className="page-link milkPage-page-btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}

      <ToastContainer />
    </div>
  );
}

export default Milk;
