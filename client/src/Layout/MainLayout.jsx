import React from "react";

import { Outlet } from "react-router-dom";
import { Footer, Navbar, RightBar } from "../components";

export default function MainLayout() {
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
