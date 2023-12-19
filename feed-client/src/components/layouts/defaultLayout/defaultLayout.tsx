import { Outlet } from "react-router-dom";
import styles from "./defaultLayout.module.css";

interface defaultLayoutProps {
  title: string;
}

export default function DefaultLayout({ title }: defaultLayoutProps) {
  return (
    <div className={styles.root}>
      <div className={styles.title}>{title}</div>
      <Outlet />
    </div>
  );
}
