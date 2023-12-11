import styles from "./sidenav.module.css";
import { NavItem } from "../../types/sidenav";
import { Link, useNavigate } from "react-router-dom";
import Auth from "auth/Auth";
import Icon, { IconNamesEnum } from "components/icon/icon";
import { RouteNames } from "router/routes";

export default function Sidenav() {
  const navigate = useNavigate();
  const items: NavItem[] = [
    {
      label: "bookmarks",
      redirectTo: RouteNames.bookmarks,
      iconName: IconNamesEnum.bookmark,
    },
    {
      label: "tags",
      redirectTo: RouteNames.tags,
      iconName: IconNamesEnum.flag,
    },
    {
      label: "search",
      redirectTo: RouteNames.search,
      iconName: IconNamesEnum.search,
    },
    {
      label: "most upvoted",
      redirectTo: RouteNames.mostUpvoted,
      iconName: IconNamesEnum.trending,
    },
    {
      label: "recommended",
      redirectTo: RouteNames.recommended,
      iconName: IconNamesEnum.bell,
    },
    {
      label: "contacts",
      redirectTo: RouteNames.contacts,
      iconName: IconNamesEnum.user,
    },
  ];

  return (
    <div className={styles.root}>
      <div className={styles.title}> feed </div>

      <div className={styles.navItems}>
        {items.map((item) => (
          <div
            className={styles.navItem}
            key={item.label}
            onClick={() => {
              navigate(item.redirectTo);
            }}
          >
            <Icon name={item.iconName} fill="#303030" stroke="#fff" />
            <div className={styles.navLink}>{item.label}</div>
          </div>
        ))}
        <div className={styles.navItem} key="logout">
          <Icon name={IconNamesEnum.logout} />
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
