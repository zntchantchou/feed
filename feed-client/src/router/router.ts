import { createBrowserRouter } from "react-router-dom";
import { RouteNames } from "./routes";
import PageLayout from "components/layouts/pageLayout/pageLayout";
import Feed from "views/feed/feed";
import Login from "views/login/login";
import Signup from "views/signup/signup";
import Bookmarks from "views/bookmarks/bookmarks";
import Contacts from "views/contacts/contacts";
import DefaultLayout from "components/layouts/defaultLayout/defaultLayout";

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
    Component: PageLayout,
    children: [
      {
        path: RouteNames.feed,
        Component: Feed,
      },
      {
        path: RouteNames.bookmarks,
        Component: Bookmarks,
      },
      {
        path: RouteNames.contacts,
        element: DefaultLayout({ title: "Contacts" }),
        children: [
          {
            path: "*",
            Component: Contacts,
          },
        ],
      },
      {
        path: RouteNames.tags,
        element: DefaultLayout({ title: "Tags" }),
      },
      {
        path: RouteNames.mostUpvoted,
        element: DefaultLayout({ title: "Most upvoted" }),
      },
      {
        path: RouteNames.recommended,
        element: DefaultLayout({ title: "Recommended" }),
      },
      {
        path: "*",
        Component: Feed,
      },
    ],
  },
]);
