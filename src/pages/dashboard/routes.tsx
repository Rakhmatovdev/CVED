import { lazy } from "react";
import { ErrorWrapper } from "@/features/error-wrapper.tsx";
import { Permissions } from "@/shared/config/permissions";
import type { CustomRoute } from "@/shared/types";
import DashboardIcon from "@/shared/ui/icons/sidebar/DashboardIcon.tsx";

const Dashboard = lazy(() => import("@/pages/dashboard"));

const dashboardRoutes: CustomRoute = {
  handle: {
    title: "breadcrumb.dashboard",
    icon: (props) => <DashboardIcon {...props} />,
    permissions: [Permissions.AllowAll]
  },
  id: "dashboard",
  path: "/dashboard",
  element: <Dashboard />,
  errorElement: <ErrorWrapper />
};

export default dashboardRoutes;
