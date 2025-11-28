import { Header } from "./(components)/Header";
import SignUpForm from "./(components)/SignUpForm";
import styles from "./page.module.css";

export default function SignUpPage() {
  return (
    <div className={styles.container}>
      <Header />
      <SignUpForm />
    </div>
  );
}
