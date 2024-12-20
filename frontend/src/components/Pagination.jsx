import React from "react";
import "../stylesheets/Pagination.css";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {
  const next = () => {
    if (currentPage !== nPages - 1 && currentPage <= nPages)
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
          <MdKeyboardArrowLeft />
        </button>
        <span className="pages">
          {currentPage + 1} / {nPages}
        </span>
        <button
          className={currentPage === nPages - 1 ? "disabled" : "enabled"}
          onClick={next}
        >
          <MdOutlineKeyboardArrowRight />
        </button>
      </div>
    </>
  );
};

export default Pagination;