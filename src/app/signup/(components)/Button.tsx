import styles from "./Button.module.css";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "accent";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
};

export default function Button({
  children,
  variant = "primary",
  onClick,
  type = "button",
  className = "",
}: ButtonProps) {
  return (
    <button type={type} onClick={onClick} className={`${styles.button} ${styles[variant]} ${className}`}>
      {children}
    </button>
  );
}
