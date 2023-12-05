import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import router from "router/router";
import { useEffect, useContext, createContext, useState } from "react";
import AuthService from "auth/auth";
import { User } from "firebase/auth";

export const AuthContext = createContext<User | null>(null);

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = AuthService.auth.onAuthStateChanged((firebaseUser) => {
      console.log("APP Firebaseuser", firebaseUser);
      setCurrentUser(firebaseUser);
    });
    return unsubscribe;
  }, []);

  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <AuthContext.Provider value={currentUser}>
            <RouterProvider router={router} />
          </AuthContext.Provider>
        </div>
      </QueryClientProvider>
    </>
  );
}

export default App;
