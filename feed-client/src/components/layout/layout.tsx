import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AuthService from "auth/auth";
import Header from "components/header/header";
import Sidenav from "components/sidenav/sidenav";
import styles from "./layout.module.css";

function Layout() {
  const navigate = useNavigate();
  const [isAuthReady, setIsAuthReady] = useState<boolean>(false);

  // check Authentication
  useEffect(() => {
    AuthService.isReady()
      .then(() => {
        if (!AuthService.auth.currentUser) {
          return navigate("/login");
        }
        setIsAuthReady(true);
      })
      .catch((e) => console.log("ready e ", e));
  }, []);

  let content;
  if (isAuthReady) {
    content = (
      <div className={styles.content}>
        <Outlet></Outlet>
        <Sidenav></Sidenav>
      </div>
    );
  } else {
    content = <div>Loading ...</div>;
  }
  return (
    <div className={styles.root}>
      <Header></Header>
      {content}
    </div>
  );
}

export default Layout;
