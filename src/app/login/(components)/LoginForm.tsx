"use client";

import Link from "next/link";
import styles from "./LoginForm.module.css";

export const LoginForm = () => {
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Sign In</h1>

      <form className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label}>Email</label>
          <input type="email" className={styles.input} placeholder="Enter your email" />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Password</label>
          <input type="password" className={styles.input} placeholder="Enter your password" />
        </div>

        <button type="submit" className={styles.submit}>
          Login
        </button>
      </form>

      <p className={styles.footerText}>
        Don&apos;t have an account ?{" "}
        <Link href="/signup" className={styles.footerLink}>
          Sign Up
        </Link>
      </p>
    </section>
  );
};
