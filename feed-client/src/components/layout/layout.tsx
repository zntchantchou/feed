import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Auth from "auth/auth";
import Header from "components/header/header";
import Sidenav from "components/sidenav/sidenav";
import styles from "./layout.module.css";

function Layout() {
  // check Authentication
  const navigate = useNavigate();
  useEffect(() => {
    if (!Auth.isLoggedIn()) navigate("/login");
  }, []);

  return (
    <div className={styles.root}>
      <Header></Header>
      <div className={styles.content}>
        <Outlet></Outlet>
        <Sidenav></Sidenav>
      </div>
    </div>
  );
}

export default Layout;
