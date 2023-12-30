import React, { useState, createContext } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { darkTheme, lightTheme } from "./utils/theme.js";

import "./index.css";

// import pages that router will use
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Login from "./components/Login-Signup/LoginForm.jsx";
import Signup from "./components/Login-Signup/SignupForm.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import CreateSnippetPage from "./pages/CreateSnippetPage.jsx";
import UserSettings from "./pages/UserSettings.jsx";
import UserSnippets from "./pages/UserSnippets.jsx";
import MainSnippets from "./pages/MainSnippets.jsx";
import IndividualSnippets from "./pages/IndividualSnippet.jsx";
import EditPage from "./pages/EditPage.jsx";

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
        path: "/user-settings",
        element: <UserSettings />,
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
        path: "/individual-snippets/:snippetId",
        element: <IndividualSnippets />,
      },
      {
        path: "/edit-page/:snippetId",
        element: <EditPage />,
      },
    ],
  },
]);

export const ThemeContext = createContext();

const Main = () => {
  // State to keep track of whether the theme is light or dark
  const [isDarkMode, setIsDarkMode] = useState(true); // Mode is dark by default

  // Function that toggles between light and dark modes
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <ChakraProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
        <RouterProvider router={router} />
      </ThemeContext.Provider>
    </ChakraProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
