import React from "react";
import styles from "./ProductListPagination.module.css";

export default function ProductListPagination({
  totalPages,
  paginate,
  currentPage,
  setCurrentPage,
}) {
  const maxNumbers = 10;
  let pages = [];
  //Filling array with pages numbers
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  //getting only 10 pages
  let pageNumbers = () => {
    const half = Math.round(maxNumbers / 2);
    let to = maxNumbers;
    if (currentPage + half >= totalPages) {
      to = totalPages;
    } else if (currentPage > half) {
      to = currentPage + half;
    }
    let from = to - maxNumbers;
    if (from < 0) {
      from = 0;
    }
    return pages.slice(from, to);
  };

  return (
    <div className={styles.containerPagination}>
      {currentPage > 1 && (
        <li className={styles.previous}>
          <a href="#" onClick={() => paginate(-1)}>
            Prev
          </a>
        </li>
      )}
      {pageNumbers().map((number) => (
        <li
          key={number}
          className={
            number === currentPage ? styles.active : styles.liContainer
          }
        >
          <a href="#" onClick={() => setCurrentPage(number)}>
            {number}
          </a>
        </li>
      ))}
      {currentPage !== totalPages && (
        <li className={styles.next}>
          <a href="#" onClick={() => paginate(1)}>
            Next
          </a>
        </li>
      )}
    </div>
  );
}