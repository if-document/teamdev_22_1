import styles from "./page.module.css";
import { Header } from "./(components)/Header";
import { LoginForm } from "./(components)/LoginForm";

export default function LoginPage() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <LoginForm />
      </main>
    </div>
  );
}
