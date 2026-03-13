import React from "react";
import "./pagination.css";

function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange }) {

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <nav aria-label="pagination" className="pagination-container mt-4">

      <ul className="pagination justify-content-center">

        {/* Previous */}

        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>

          <button
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
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

        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >

          <button
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
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