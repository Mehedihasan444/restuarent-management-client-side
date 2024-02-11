import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import Routes from "./Routes/Routes.jsx";
import AuthProvider from "./AuthProvider/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
const queryClient = new QueryClient();
const helmetContext = {};
ReactDOM.createRoot(document.getElementById("root")).render(
  <HelmetProvider context={helmetContext}>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <React.StrictMode>
          <RouterProvider router={Routes}></RouterProvider>
        </React.StrictMode>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);
