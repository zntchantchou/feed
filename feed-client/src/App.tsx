import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "./App.css";
import Layout from "./components/layout/layout";
import Feed from "views/feed/feed";
import initializeFirebase from "auth/firebase";

function App() {
  const queryClient = new QueryClient();
  initializeFirebase();
  console.log("env", process.env.REACT_APP_NEWS_URL);
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <Layout>
            <Routes>
              <Route
                path="*"
                element={
                  <div>
                    <Feed />
                  </div>
                }
              ></Route>
            </Routes>
          </Layout>
        </div>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
