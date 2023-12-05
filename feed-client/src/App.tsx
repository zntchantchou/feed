import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import router from "router/router";
import { useEffect } from "react";
import auth from "auth/auth";

function App() {
  const queryClient = new QueryClient();
  // console.log("[APP] RENDER value", value);
  useEffect(() => {
    console.log("IS LOGGED IN AT START ", auth.isLoggedIn());
    if (!auth.isLoggedIn()) {
      auth
        .logIn()
        .then(() =>
          console.log(
            "LOGIN RESPONSE ",
            auth.getUserInfo(),
            "\n isloggedin ",
            auth.isLoggedIn()
          )
        )
        .catch((err) => console.log("LOGIN ERROR ", err));
    }
  }, []);

  useEffect(() => {
    console.log("Is logged in", auth.isLoggedIn());
  }, [auth.isLoggedIn()]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <RouterProvider router={router} />
        </div>
      </QueryClientProvider>
    </>
  );
}

export default App;
