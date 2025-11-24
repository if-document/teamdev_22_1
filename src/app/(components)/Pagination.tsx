"use client";

import styles from "./Pagination.module.css";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onChangePage: (page: number) => void;
};

export function Pagination({ currentPage, totalPages, onChangePage }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={styles.container}>
      <button className={styles.navButton} disabled={currentPage === 1} onClick={() => onChangePage(currentPage - 1)}>
        ← Previous Page
      </button>

      <div className={styles.pages}>
        {pages.map((page) => (
          <button
            key={page}
            className={page === currentPage ? `${styles.pageButton} ${styles.pageButtonActive}` : styles.pageButton}
            onClick={() => onChangePage(page)}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        className={styles.navButton}
        disabled={currentPage === totalPages}
        onClick={() => onChangePage(currentPage + 1)}
      >
        Next Page →
      </button>
    </div>
  );
}
