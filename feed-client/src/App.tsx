import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "./App.css";
import Layout from "./components/layout/layout";
import Feed from "views/feed/feed";
import firebaseConfig from "auth/config";
import Login from "views/login/login";

const router = () =>
  createBrowserRouter([
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
    {
      path: "login",
      Component: Login,
    },
  ]);

function App() {
  const queryClient = new QueryClient();
  console.log("firebaseconfgig", firebaseConfig);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <RouterProvider router={router()} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
