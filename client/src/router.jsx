import { createBrowserRouter, Navigate, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import { AccountPage, HomePage, WelcomePage, NotFoundPage } from "./pages";
import MainLayout from "./Layout/MainLayout";

function AuthenticatedRoute({ path, ...props }) {
  const { currentUser } = useAuth;

  return currentUser ? (
    <Route path="/" {...props} />
  ) : (
    <Navigate to="/welcome" />
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <AuthenticatedRoute element={<HomePage />} />,
      },
      {
        path: "/home",
        element: <AuthenticatedRoute element={<HomePage />} />,
      },
      {
        path: "/account",
        element: <AuthenticatedRoute element={<AccountPage />} />,
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
