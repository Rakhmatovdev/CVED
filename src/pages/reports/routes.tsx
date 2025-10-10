import { lazy } from "react";
import { twMerge } from "tailwind-merge";
import { ErrorWrapper } from "@/features/error-wrapper.tsx";
import { Permissions } from "@/shared/config/permissions";
import type { CustomRoute } from "@/shared/types";
import OrderIcon from "@/shared/ui/icons/Order.tsx";

const Gender = lazy(() => import("@/pages/reports/gender"));
const Countries = lazy(() => import("@/pages/reports/countries"));

const reportRoutes: CustomRoute = {
  id: "report",
  type: "dropdown",
  handle: {
    title: "breadcrumb.report",
    breadCrumbDisabled: true,
    icon: (props) => (
      <OrderIcon {...props} className={twMerge(props.className, "-ml-px")} />
    ),
    permissions: [Permissions.AllowAll]
  },
  path: "/report",
  errorElement: <ErrorWrapper />,
  children: [
    {
      path: "gender",
      element: <Gender />,
      handle: {
        title: "breadcrumb.gender",
        permissions: [Permissions.AllowAll]
      }
    },
    {
      path: "countries",
      element: <Countries />,
      handle: {
        title: "breadcrumb.countries",
        permissions: [Permissions.AllowAll]
      }
    }
  ]
};
export default reportRoutes;
