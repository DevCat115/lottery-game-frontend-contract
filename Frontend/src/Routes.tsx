import { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Blank from "./pages/Blank";

// ----------------------------------------------------------------------------------

const LandingLayout = lazy(() => import("./layouts"));
const Home = lazy(() => import("./pages/Home"));

// ----------------------------------------------------------------------------------

export default function Routes() {
  return useRoutes([
    {
      element: <LandingLayout />,
      path: "/",
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "404",
          element: <Blank />,
        },
        {
          path: "*",
          element: <Navigate to="/404" replace />,
        },
      ],
    },
  ]);
}
