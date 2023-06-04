import { createBrowserRouter, Route } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import {AccountPage, HomePage, WelcomePage, NotFoundPage} from './pages'
import MainLayout from "./Layout/MainLayout";


const login = false;

const Login = ({ path, ...props }) => {
  const { currentUser } = useAuth();
  return currentUser ? <HomePage /> : <WelcomePage />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Login path="/" element={<HomePage />} />,
      },
      {
        path: "/welcome",
        element: <WelcomePage />,
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
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
