import Link from "next/link";
import Button from "./Button";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <Link href="/login">
        <Button variant="secondary">Login</Button>
      </Link>
      <Link href="/signup">
        <Button variant="primary">Sign Up</Button>
      </Link>
    </header>
  );
}
