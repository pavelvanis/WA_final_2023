import React, { useEffect, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Footer, Navbar, RightBar } from "../components";
import { useAuth } from "../hooks/useAuth";

export default function MainLayout() {
  const { currentUser } = useAuth();
  const load = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (load.current && !currentUser) {
      console.log(currentUser);
      console.log("user layout");
      return navigate("/welcome");
    }
    return () => (load.current = true);
  }, [currentUser]);

  return <>{currentUser ? <Body /> : null}</>;
}

function Body() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
