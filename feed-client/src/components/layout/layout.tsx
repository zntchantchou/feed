import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import AuthService from "auth/Auth";
import Header from "components/header/header";
import Sidenav from "components/sidenav/sidenav";
import styles from "./layout.module.css";
import { AuthContext } from "App";

function Layout() {
  const navigate = useNavigate();
  const [isAuthReady, setIsAuthReady] = useState<boolean>(false);
  const currentUser = useContext(AuthContext);
  // check Authentication
  useEffect(() => {
    AuthService.isReady()
      .then(() => {
        if (!AuthService.auth.currentUser) {
          console.log(" LAYOUT NAVIGATE ", AuthService.auth.currentUser);
          return navigate("/login");
        }
        setIsAuthReady(true);
      })
      .catch((e) => console.log("ready e ", e));
  }, []);

  useEffect(() => {
    console.log("Layout current user: ", currentUser);
  }, [currentUser]);

  let content;
  if (isAuthReady && currentUser) {
    content = (
      <div className={styles.content}>
        <Outlet></Outlet>
        <Sidenav></Sidenav>
      </div>
    );
  } else if (isAuthReady && !currentUser) {
    console.log("NAVIGATING");
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <div className={styles.root}>
      <Header></Header>
      {content}
    </div>
  );
}

export default Layout;
