import { Outlet } from "react-router-dom";
import styles from "./defaultLayout.module.css";

export default function DefaultLayout() {
  return (
    <div className={styles.root}>
      <Outlet />
    </div>
  );
}
