import styles from "./sidenav.module.css";
import { NavItem } from "../../types/sidenav";
import { Link, redirect, useNavigate } from "react-router-dom";
import Auth from "auth/Auth";

export default function Sidenav() {
  const navigate = useNavigate();
  const items: NavItem[] = [
    {
      label: "bookmarks",
      redirectTo: "bookmarks",
      icon: "folder",
    },
    {
      label: "tags",
      redirectTo: "tags",
      icon: "flag",
    },
    {
      label: "search",
      redirectTo: "search",
      icon: "search",
    },
    {
      label: "most upvoted",
      redirectTo: "most-upvoted",
      icon: "trending-up",
    },
    {
      label: "recommended",
      redirectTo: "recommended",
      icon: "bell",
    },
    {
      label: "contacts",
      redirectTo: "contacts",
      icon: "user",
    },
  ];

  return (
    <div className={styles.root}>
      <div className={styles.title}> feed </div>

      <div className={styles.navItems}>
        {items.map((item) => (
          <div className={styles.navItem} key={item.label}>
            <img
              src={"./" + item.icon + ".svg"}
              alt={item.label}
              color="white"
            ></img>
            <Link to={item.redirectTo} className={styles.navLink}>
              {item.label}
            </Link>
          </div>
        ))}
        <div className={styles.navItem} key="logout">
          <img src="./logout.svg" alt="logout" color="white"></img>
          <div
            className={styles.navLink}
            onClick={async () => {
              await Auth.logOut();
              navigate("/login");
            }}
          >
            logout
          </div>
        </div>
      </div>
    </div>
  );
}
