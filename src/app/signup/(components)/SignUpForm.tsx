"use client";

import { useState } from "react";
import Button from "./Button";
import styles from "./SignUpForm.module.css";

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Sign Up Data:", formData);
    alert("Sign Up機能は実装中です(モックデータ)");
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>Sign Up</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="name" className={styles.label}>
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className={styles.input}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={styles.input}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className={styles.input}
            required
          />
        </div>

        <Button type="submit" variant="accent">
          Sign Up
        </Button>
      </form>

      <p className={styles.loginLink}>
        Already have an account?{" "}
        <a href="/login" className={styles.link}>
          Login
        </a>
      </p>
    </div>
  );
}
