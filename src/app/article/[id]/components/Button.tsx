import styles from "../styles.module.css";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button className={`${styles.button} ${styles.buttonBlue}`} onClick={onClick}>
      {children}
    </button>
  );
}
