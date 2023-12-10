import { createBrowserRouter } from "react-router-dom";
import Layout from "components/layout/layout";
import Feed from "views/feed/feed";
import Login from "views/login/login";
import Signup from "views/signup/signup";
import Bookmarks from "views/bookmarks/bookmarks";
import { RouteNames } from "./routes";

export default createBrowserRouter([
  {
    path: RouteNames.login,
    Component: Login,
  },
  {
    path: RouteNames.signup,
    Component: Signup,
  },
  {
    path: "*",
    Component: Layout,
    children: [
      {
        path: "",
        Component: Feed,
      },
      {
        path: RouteNames.feed,
        Component: Feed,
      },
      {
        path: RouteNames.bookmarks,
        Component: Bookmarks,
      },
    ],
  },
]);
