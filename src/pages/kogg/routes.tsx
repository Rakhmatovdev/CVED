import { ErrorWrapper } from "@/features/error-wrapper.tsx";
import KoggBoarders from "@/pages/kogg/components/KoggBorders.tsx";
import KoggDetail from "@/pages/kogg/components/KoggDetail.tsx";
import { Permissions } from "@/shared/config/permissions/permissions.ts";
import { CustomRoute } from "@/shared/types";
import KoggIcon from "@/shared/ui/icons/sidebar/KoggIcon.tsx";
import Kogg from "./index.tsx";

const koggRoutes: CustomRoute = {
  id: "kogg",
  path: "/kogg",
  // element: <Kogg />,
  errorElement: <ErrorWrapper />,
  handle: {
    title: "breadcrumb.kogg",
    icon: (props) => <KoggIcon {...props} />,
    permissions: [Permissions.AllowAll]
  },
  children: [
    {
      index: true,
      handle: {
        noBreadCrumb: true
      },
      element: <Kogg />
    },
    {
      path: "arrived/:id",
      element: <KoggDetail />,
      handle: {
        hideOnSidebar: true,
        permissions: [Permissions.AllowAll]
      }
    },
    {
      path: "departed/:id",
      element: <KoggDetail />,
      handle: {
        hideOnSidebar: true,
        permissions: [Permissions.AllowAll]
      }
    },
    {
      path: "borders/:bid",
      element: <KoggBoarders />,
      handle: {
        hideOnSidebar: true,
        permissions: [Permissions.AllowAll]
      }
    }
  ]
};
export default koggRoutes;

// import { lazy } from "react";
// import { ErrorWrapper } from "@/features/error-wrapper.tsx";
// import { Permissions } from "@/shared/config/permissions";
// import type { CustomRoute } from "@/shared/types";
// import KoggIcon from "@/shared/ui/icons/sidebar/KoggIcon.tsx";
//
// const Arm = lazy(() => import("@/pages/immigrants/identify"));
// const ArmDetail = lazy(
//   () => import("@/pages/immigrants/identify/componenta/ArmDetail.tsx")
// );
// const Borders = lazy(
//   () => import("@/pages/immigrants/identify/componenta/Borders.tsx")
// );
// const NoIdentify = lazy(() => import("@/pages/immigrants/unidentify"));
// const NoIdentifyDetail = lazy(
//   () => import("@/pages/immigrants/unidentify/components/NoIdentifyDetail.tsx")
// );
// const koggRoutes: CustomRoute = {
//   id: "immigrants",
//   path: "/kogg",
//   errorElement: <ErrorWrapper />,
//   handle: {
//     title: "breadcrumb.kogg",
//     icon: (props) => <KoggIcon {...props} />,
//     permissions: [Permissions.AllowAll]
//   },
//   children: [
//     {
//       path: "identify",
//       handle: {
//         title: "breadcrumb.identify",
//         permissions: [Permissions.AllowAll]
//       },
//       children: [
//         {
//           index: true,
//           element: <Arm />
//         },
//         {
//           path: ":id",
//           element: <ArmDetail />,
//           handle: {
//             title: "breadcrumb.identify",
//             permissions: [Permissions.AllowAll]
//           }
//         }
//       ]
//     },
//     {
//       path: "unidentify",
//       handle: {
//         title: "breadcrumb.unidentify",
//         permissions: [Permissions.AllowAll]
//       },
//       children: [
//         {
//           index: true,
//           element: <NoIdentify />
//         },
//         {
//           path: ":id",
//           element: <NoIdentifyDetail />,
//           handle: {
//             title: "breadcrumb.unidentify",
//             permissions: [Permissions.AllowAll]
//           }
//         }
//       ]
//     },
//     {
//       path: "borders/:bid",
//       element: <Borders />,
//       handle: {
//         hideOnSidebar: true,
//         permissions: [Permissions.AllowAll]
//       }
//     }
//   ]
// };
//
// export default koggRoutes;
