import { RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import router from "router/router";
import "./App.css";
import { useEffect } from "react";
import Auth from "auth/Auth";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
