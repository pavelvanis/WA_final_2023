import { createBrowserRouter } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <WelcomePage />,
    }
])

export default router