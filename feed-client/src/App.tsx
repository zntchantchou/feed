import { RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useEffect, createContext, useState } from "react";
import { User } from "firebase/auth";
import router from "router/router";
import AuthService from "auth/Auth";
import "./App.css";

export const AuthContext = createContext<User | null>(null);

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const queryClient = new QueryClient();
  useEffect(() => {
    const unsubscribe = AuthService.auth.onAuthStateChanged((firebaseUser) => {
      console.log("[ONAUTHSTATECHANGE] currentUser", currentUser);
      setCurrentUser(firebaseUser);
    });
    return unsubscribe;
  }, []);

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
