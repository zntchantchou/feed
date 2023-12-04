import Header from "components/header/header";
import Sidenav from "components/sidenav/sidenav";
import styles from "./layout.module.css";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.root}>
      <Header></Header>
      <div className={styles.content}>
        {children}
        <Sidenav></Sidenav>
      </div>
    </div>
  );
}

export default Layout;
