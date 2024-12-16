import React from "react";
import PropTypes from "prop-types";
import "./Pagination.css";

const Pagination = ({
  gotoPage,
  previousPage,
  nextPage,
  canPreviousPage,
  canNextPage,
  pageCount,
  pageIndex,
}) => {
  return (
    <div className="pagination">
      <button
        onClick={() => gotoPage(0)}
        disabled={!canPreviousPage}
        className="pagination__btn btn-reset"
      >
        {"<<"}
      </button>
      <button
        onClick={() => previousPage()}
        disabled={!canPreviousPage}
        className="pagination__btn btn-reset"
      >
        {"<"}
      </button>
      <span className="pagination__text">
        <strong>
          {pageIndex + 1} / {pageCount}
        </strong>
      </span>
      <button
        onClick={() => nextPage()}
        disabled={!canNextPage}
        className="pagination__btn btn-reset"
      >
        {">"}
      </button>
      <button
        onClick={() => gotoPage(pageCount - 1)}
        disabled={!canNextPage}
        className="pagination__btn btn-reset"
      >
        {">>"}
      </button>
    </div>
  );
};

Pagination.propTypes = {
  gotoPage: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  canPreviousPage: PropTypes.bool.isRequired,
  canNextPage: PropTypes.bool.isRequired,
  pageCount: PropTypes.number.isRequired,
  pageIndex: PropTypes.number.isRequired,
};

export default Pagination;
