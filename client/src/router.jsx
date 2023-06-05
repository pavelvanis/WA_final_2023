import { createBrowserRouter, Navigate, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import { AccountPage, HomePage, WelcomePage, NotFoundPage } from "./pages";
import MainLayout from "./Layout/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/account",
        element: <AccountPage />,
      },
    ],
  },
  {
    path: "/welcome",
    element: <WelcomePage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
