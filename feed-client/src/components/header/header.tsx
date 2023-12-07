import styles from "./header.module.css";
import Auth from "auth/Auth";

function Header() {
  return (
    <div className={styles.root}>
      <div className={styles.email}>{Auth.currentUser?.email}</div>
    </div>
  );
}

export default Header;
