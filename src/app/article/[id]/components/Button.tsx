import styles from "../styles.module.css";

type ButtonProps = {
  variant?: "blue" | "red";
  children: React.ReactNode;
  onClick?: () => void;
};

export default function Button({ variant = "blue", children, onClick }: ButtonProps) {
  const colorClass = variant === "red" ? styles.buttonRed : styles.buttonBlue;

  return (
    <button className={`${styles.button} ${colorClass}`} onClick={onClick}>
      {children}
    </button>
  );
}
