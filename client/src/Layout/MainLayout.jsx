import React, { useEffect, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Footer, Navbar, RightBar } from "../components";
import { useAuth } from "../hooks/useAuth";

export default function MainLayout() {

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />¡
    </>
  );
}
