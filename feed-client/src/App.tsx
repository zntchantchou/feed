import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import router from "router/router";
import { useEffect, useContext, createContext } from "react";
import auth from "auth/auth";
import { User } from "firebase/auth";

const AuthContext = createContext<User | null>(null);

function App() {
  useEffect(() => {
    const unsubscribe = auth.auth.onAuthStateChanged((currentUser) => {
      console.log("APP CURR", currentUser);
    });
    return unsubscribe;
  }, []);
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <AuthContext.Provider value={null}>
            <RouterProvider router={router} />
          </AuthContext.Provider>
        </div>
      </QueryClientProvider>
    </>
  );
}

export default App;
