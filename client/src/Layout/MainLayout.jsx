import React, { useEffect, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Footer, Navbar, RightBar } from "../components";
import { useAuth } from "../hooks/useAuth";
import { UserProvider } from "../hooks/useUser";

export default function MainLayout() {
  const { currentUser } = useAuth();
  const load = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (load.current && !currentUser) {
      return navigate("/welcome");
    }
    return () => (load.current = true);
  }, [currentUser]);

  return <>{currentUser ? <Body /> : null}</>;
}

function Body() {
  return (
    <UserProvider>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </UserProvider>
  );
}
