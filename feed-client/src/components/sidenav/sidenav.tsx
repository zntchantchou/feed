import styles from "./sidenav.module.css";
import { NavItem } from "../../types/sidenav";
import { Link } from "react-router-dom";

export default function Sidenav() {
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
  ];

  return (
    <div className={styles.root}>
      <div className={styles.title}> My feed </div>

      <div className={styles.navItems}>
        {items.map((item) => (
          <div className={styles.navItem} key={item.label}>
            <img
              src={"./" + item.icon + ".svg"}
              alt={item.label}
              color="white"
            ></img>
            <Link
              to={item.redirectTo}
              style={{
                textDecoration: "none",
                marginLeft: "1rem",
              }}
              className={styles.navLink}
            >
              {item.label}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
