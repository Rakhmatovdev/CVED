import { lazy } from "react";
import { ErrorWrapper } from "@/features/error-wrapper.tsx";
import { Permissions } from "@/shared/config/permissions";
import type { CustomRoute } from "@/shared/types";
import ArmIcon from "@/shared/ui/icons/sidebar/ArmIcon.tsx";

const Arm = lazy(() => import("@/pages/immigrants/identify"));
const ArmDetail = lazy(
  () => import("@/pages/immigrants/identify/componenta/ArmDetail.tsx")
);
const Borders = lazy(
  () => import("@/pages/immigrants/identify/componenta/Borders.tsx")
);
const NoIdentify = lazy(() => import("@/pages/immigrants/unidentify"));
const NoIdentifyDetail = lazy(
  () => import("@/pages/immigrants/unidentify/components/NoIdentifyDetail.tsx")
);
const immigrantsRoutes: CustomRoute = {
  id: "immigrants",
  type: "dropdown",
  path: "/immigrants",
  errorElement: <ErrorWrapper />,
  handle: {
    devOnly:true,
    hideOnSidebar:true,
    title: "breadcrumb.immigrants",
    breadCrumbDisabled: true,
    icon: (props) => <ArmIcon {...props} />,
    permissions: [Permissions.AllowAll]
  },
  children: [
    {
      path: "identify",
      handle: {
        title: "breadcrumb.identify",
        permissions: [Permissions.AllowAll]
      },
      children: [
        {
          index: true,
          handle: {
            noBreadCrumb: true
          },
          element: <Arm />
        },
        {
          path: ":id",
          element: <ArmDetail />,
          handle: {
            title: "breadcrumb.detail",
            permissions: [Permissions.AllowAll]
          }
        }
      ]
    },
    {
      path: "unidentify",
      handle: {
        title: "breadcrumb.unidentify",
        permissions: [Permissions.AllowAll]
      },
      children: [
        {
          index: true,
          handle: {
            noBreadCrumb: true
          },
          element: <NoIdentify />
        },
        {
          path: ":id",
          element: <NoIdentifyDetail />,
          handle: {
            title: "breadcrumb.detail",
            permissions: [Permissions.AllowAll]
          }
        }
      ]
    },
    {
      path: "borders/:bid",
      element: <Borders />,
      handle: {
        hideOnSidebar: true,
        permissions: [Permissions.AllowAll]
      }
    }
  ]
};

export default immigrantsRoutes;
