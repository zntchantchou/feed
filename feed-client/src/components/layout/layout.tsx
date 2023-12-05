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
    console.log("Layout logged in ? ", Auth?.isLoggedIn());
    console.log("LAYOUT IS LOGGED IN", Auth.isLoggedIn());
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
