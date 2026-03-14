import React from "react";
import "./pagination.css";

function Pagination({
  totalItems = 0,
  itemsPerPage = 6,
  currentPage = 1,
  onPageChange
}) {

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (

    <nav
      aria-label="pagination"
      className="pagination-container mt-4"
    >

      <ul className="pagination justify-content-center">

        {/* Previous */}

        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>

          <button
            className="page-link"
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            Previous
          </button>

        </li>

        {/* Page Numbers */}

        {pageNumbers.map((number) => (

          <li
            key={number}
            className={`page-item ${
              currentPage === number ? "active" : ""
            }`}
          >

            <button
              className="page-link"
              onClick={() => onPageChange(number)}
            >
              {number}
            </button>

          </li>

        ))}

        {/* Next */}

        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>

          <button
            className="page-link"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next
          </button>

        </li>

      </ul>

    </nav>

  );

}

export default Pagination;