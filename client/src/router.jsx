import { createBrowserRouter, Route } from "react-router-dom";
import { useAuth } from "./hooks/UserAuth";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import WelcomePage from "./pages/WelcomePage";

const login = false;

const Login = ({ path, ...props }) => {
  const { currentUser } = useAuth();
  return currentUser ? <HomePage /> : <WelcomePage />;
};

const router = createBrowserRouter([
  {
    path: "/",
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
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
