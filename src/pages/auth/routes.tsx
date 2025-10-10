import { lazy } from "react";
import { CustomRoute } from "@/shared/types";

const Login = lazy(() => import("@/pages/auth/login"));
const Reset = lazy(() => import("@/pages/auth/reset"));

const authRoutes: CustomRoute = {
  id: "auth",
  // title: "Auth",
  path: "auth",
  children: [
    { path: "login", element: <Login /> },
    { path: "reset", element: <Reset /> }
  ]
};

export default authRoutes;
