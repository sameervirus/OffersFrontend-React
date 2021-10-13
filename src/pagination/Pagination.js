import React from "react";
import classnames from "classnames";
import { usePagination, DOTS } from "./usePagination";
const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <nav aria-label="Page navigation">
      <ul
        className={classnames("pagination justify-content-center", {
          [className]: className,
        })}
      >
        {/* Left navigation arrow */}
        <li
          className={classnames("page-item", {
            disabled: currentPage === 1,
          })}
          onClick={onPrevious}
        >
          <span className="page-link">Previous</span>
        </li>
        {paginationRange.map((pageNumber, index) => {
          // If the pageItem is a DOT, render the DOTS unicode character
          if (pageNumber === DOTS) {
            return (
              <li key={index} className="page-item dots">
                <span className="page-link">&#8230;</span>
              </li>
            );
          }

          // Render our Page Pills
          return (
            <li
              key={index}
              className={classnames("page-item", {
                selected: pageNumber === currentPage,
              })}
              onClick={() => onPageChange(pageNumber)}
            >
              <span className="page-link">{pageNumber}</span>
            </li>
          );
        })}
        {/*  Right Navigation arrow */}
        <li
          className={classnames("page-item", {
            disabled: currentPage === lastPage,
          })}
          onClick={onNext}
        >
          <span className="page-link">Next</span>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
