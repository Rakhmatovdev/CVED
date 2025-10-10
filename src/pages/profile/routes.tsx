import { lazy } from "react";
import { ErrorWrapper } from "@/features/error-wrapper.tsx";
import { Permissions } from "@/shared/config/permissions";
import type { CustomRoute } from "@/shared/types";

const Profile = lazy(() => import("@/pages/profile"));

const profileRoutes: CustomRoute = {
  id: "profile",
  handle: {
    title: "Profile",
    hideOnSidebar: true,
    permissions: [Permissions.AllowAll]
  },
  path: "/profile",
  errorElement: <ErrorWrapper />,
  element: <Profile />
};

export default profileRoutes;
