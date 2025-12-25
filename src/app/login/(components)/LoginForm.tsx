"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./LoginForm.module.css";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // ログインAPIを呼び出す
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      // ログイン成功時
      router.refresh();
      router.push("/");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("エラーが発生しました");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Sign In</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label className={styles.label}>Email</label>
          <input
            type="email"
            className={styles.input}
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Password</label>
          <input
            type="password"
            className={styles.input}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && (
          <p className={styles.error} style={{ color: "red", fontSize: "0.8rem", marginBottom: "1rem" }}>
            {error}
          </p>
        )}

        <button type="submit" className={styles.submit} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
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
