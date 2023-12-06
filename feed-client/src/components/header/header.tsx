import styles from "./header.module.css";
import auth from "auth/auth";

function Header() {
  return (
    <div className={styles.root}>
      <div className={styles.email}>{auth.currentUser?.email}</div>
    </div>
  );
}

export default Header;
