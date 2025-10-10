import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

import { routes } from "./routes";

const Routes: React.FC = () => {
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
};

export default Routes;
