import { lazy, useEffect } from "react";
import { Outlet } from "react-router-dom";

// ---------------------------------------------------------------------------------------

const Navbar = lazy(() => import("./Navbar"));
const Footer = lazy(() => import("./Footer"));

// ---------------------------------------------------------------------------------------

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#111111] main-container">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
