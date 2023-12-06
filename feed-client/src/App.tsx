import { RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useEffect, createContext, useState } from "react";
import { User } from "firebase/auth";
import router from "router/router";
import AuthService from "auth/auth";
import "./App.css";

export const AuthContext = createContext<User | null>(null);

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const queryClient = new QueryClient();
  useEffect(() => {
    // AuthService.logOut()
    //   .then((r) => console.log("logged in"))
    //   .catch((err) => console.log("logout  err", err));

    const unsubscribe = AuthService.auth.onAuthStateChanged((firebaseUser) => {
      console.log("APP Firebaseuser", firebaseUser);
      setCurrentUser(firebaseUser);
      console.log("APP currentUser ", currentUser);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    console.log("APP currentuser 2 ", currentUser);
  }, [currentUser]);

  return (
    <AuthContext.Provider value={currentUser}>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <RouterProvider router={router} />
        </div>
      </QueryClientProvider>
    </AuthContext.Provider>
  );
}

export default App;
