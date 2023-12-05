import Header from "components/header/header";
import Sidenav from "components/sidenav/sidenav";
import styles from "./layout.module.css";
import { Outlet } from "react-router-dom";
import Auth from "auth/auth";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import firebaseConfig from "auth/config";
import { useEffect } from "react";

function Layout() {
  console.log("LAYOUT");
  initializeApp(firebaseConfig);
  // const navigate = useNavigate();
  if (!Auth.isLoggedIn()) {
    console.log("NO USER AT LAYOUT ");
    // navigate("/login");
  }
  useEffect(() => console.log("BUGGIN ---- \n"), []);
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
