import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Auth from "auth/Auth";
import Header from "components/header/header";
import Sidenav from "components/sidenav/sidenav";
import styles from "./pageLayout.module.css";

function PageLayout() {
  // check Authentication
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Auth.waitForStart().then(() => {
      console.log("Auth.currentUser ", Auth.currentUser);
      if (!Auth.currentUser) {
        return navigate("/login");
      }
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div>loading</div>;
  }

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

export default PageLayout;
