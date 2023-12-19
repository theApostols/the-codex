import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import customTheme from "./utils/theme.js";

import "./index.css";

// import pages that router will use
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Login from "./components/Login-Signup/LoginForm.jsx";
import Signup from "./components/Login-Signup/SignupForm.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import CreateSnippetPage from "./pages/CreateSnippetPage.jsx";
import UserPage from "./pages/UserPage.jsx";
import UserSnippets from "./pages/UserSnippets.jsx";
import MainSnippets from "./pages/MainSnippets.jsx";
import IndividualSnippets from "./pages/IndividualSnippet.jsx"

// routes and corresponding components
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/createsnippet",
        element: <CreateSnippetPage />,
      },
      {
        path: "/userpage",
        element: <UserPage />,
      },
      {
        path: "/user-snippets/:username",
        element: <UserSnippets />,
      },
      {
        path: "/main-snippets",
        element: <MainSnippets />,
      },
      {
        path: "/individual-snippets",
        element: <IndividualSnippets />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={customTheme}>
    <RouterProvider router={router} />
  </ChakraProvider>
);
