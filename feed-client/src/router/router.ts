import { createBrowserRouter } from "react-router-dom";
import Layout from "components/layout/layout";
import Feed from "views/feed/feed";
import Login from "views/login/login";

export default createBrowserRouter([
  {
    path: "login",
    Component: Login,
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
        path: "feed",
        Component: Feed,
      },
    ],
  },
]);
