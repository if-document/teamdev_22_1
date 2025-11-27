"use client";

import * as React from "react";
import styles from "./pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({ currentPage, totalPages, onPageChange, className = "" }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={`${styles.pagination} ${className}`}>
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={styles.navButton}
      >
        <div className={`${styles.arrow} ${styles.arrowPrev}`}></div>
        {/* <svg className={`${styles.arrow} ${styles.arrowPrev}`} viewBox="0 0 46 37">
          <path d="M13 17.2374V19.7626H28.1515L21.2071 26.7071L23 28.5L33 18.5L23 8.5L21.2071 10.2929L28.1515 17.2374H13Z" />
        </svg> */}
        <span>Previous Page</span>
      </button>

      {/* Page Numbers */}
      <div className={styles.pages}>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`${styles.pageButton} ${page === currentPage ? styles.active : ""}`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={styles.navButton}
      >
        <span>Next Page</span>
        <div className={styles.arrow}></div>
        {/* <svg className={styles.arrow} viewBox="0 0 46 37">
          <path d="M13 17.2374V19.7626H28.1515L21.2071 26.7071L23 28.5L33 18.5L23 8.5L21.2071 10.2929L28.1515 17.2374H13Z" />
        </svg> */}
      </button>
    </div>
  );
}
