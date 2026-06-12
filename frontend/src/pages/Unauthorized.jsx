import { Link } from "react-router-dom";
import styles from "../style/unauthorized.module.css";

export default function Unauthorized() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Access Denied</h1>
      <p className={styles.message}>
        Your session may have expired or you don't have permission to access this page.
      </p>
      <Link to="/" className={styles.link}>
        Return to Login
      </Link>
    </div>
  );
}