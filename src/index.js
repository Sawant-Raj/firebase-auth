import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import App from "./App";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import UserProfile from "./components/Profile/UserProfile";
import { AuthContextProvider } from "./store/auth-context"; // imported as a named import

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/auth",
        element: <AuthPage />,
      },
      {
        path: "/profile",
        element: <UserProfile />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <RouterProvider router={router} />
  </>
);
