"use client";

import Link from "next/link";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/login" className={`${styles.btn} ${styles.outline}`}>
          Login
        </Link>
        <Link href="/signup" className={`${styles.btn} ${styles.filled}`}>
          Sign Up
        </Link>
      </div>
    </header>
  );
};
