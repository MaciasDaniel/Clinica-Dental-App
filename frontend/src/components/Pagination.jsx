import React from "react";
import "../stylesheets/Pagination.css";

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {
  const next = () => {
    if (currentPage !== nPages && currentPage <= nPages)
      setCurrentPage(currentPage + 1);
  };

  const prev = () => {
    if (currentPage !== 0) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <div className="pagination-container">
        <button
          className={currentPage === 0 ? "disabled" : "enabled"}
          onClick={prev}
        >
          Anterior
        </button>
        <span className="pages">
          {currentPage} / {nPages}
        </span>
        <button
          className={currentPage === nPages ? "disabled" : "enabled"}
          onClick={next}
        >
          Siguiente
        </button>
      </div>
    </>
  );
};

export default Pagination;
