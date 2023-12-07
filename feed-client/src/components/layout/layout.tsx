import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Auth from "auth/Auth";
import Header from "components/header/header";
import Sidenav from "components/sidenav/sidenav";
import styles from "./layout.module.css";

function Layout() {
  // check Authentication
  const navigate = useNavigate();
  // const currentUser = useCurrentUser();

  useEffect(() => {
    // console.log("CURRENT USER !!", currentUser);
    if (!Auth.currentUser) {
      navigate("/login");
    }
  }, [Auth.currentUser]);

  console.log("LAYOUT AuthService.currentUser ", Auth.currentUser);

  let content;
  if (Auth.currentUser) {
    content = (
      <div className={styles.content}>
        <Outlet></Outlet>
        <Sidenav></Sidenav>
      </div>
    );
  } else {
    console.log("----- LOADING ----- ");
    content = <div>loading</div>;
  }

  return (
    <div className={styles.root}>
      <Header></Header>
      {content}
    </div>
  );
}

export default Layout;
