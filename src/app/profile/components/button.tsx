"use client";

import * as React from "react";
import styles from "./button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "danger";
  size?: "default" | "sm" | "lg";
  children: React.ReactNode;
}

export function Button({ variant = "default", size = "default", className = "", children, ...props }: ButtonProps) {
  const variantClass = variant === "default" ? styles.default : styles.danger;
  const sizeClass = size === "default" ? styles.sizeDefault : styles[size];

  return (
    <button className={`${styles.button} ${variantClass} ${sizeClass} ${className}`} {...props}>
      {children}
    </button>
  );
}
