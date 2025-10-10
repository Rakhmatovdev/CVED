import { Navigate } from "react-router";
import { Permissions } from "@/shared/config/permissions";
import type { CustomRoute } from "@/shared/types";

const homeRoutes: CustomRoute = {
  index: true,
  handle: {
    hideOnSidebar: true,
    permissions: [Permissions.AllowAll]
  },
  element: <Navigate to="/dashboard" replace />
};

export default homeRoutes;
