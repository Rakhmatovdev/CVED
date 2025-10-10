import AuthGuard from "./AuthGuard";

// CSS imports
import "flag-icons/css/flag-icons.min.css";

// Route imports
import { ErrorWrapper } from "@/features/error-wrapper";
import authRoutes from "@/pages/auth/routes.tsx";
import dashboardRoutes from "@/pages/dashboard/routes.tsx";
import homeRoutes from "@/pages/home/routes.tsx";
import immigrantsRoutes from "@/pages/immigrants/routes.tsx";
import koggRoutes from "@/pages/kogg/routes.tsx";
import profileRoutes from "@/pages/profile/routes.tsx";
import reportRoutes from "@/pages/reports/routes.tsx";
import { checkUserPermission, Permissions } from "@/shared/config/permissions";
import type { CustomRoute } from "@/shared/types";

const publicRoutes = [authRoutes];

const protectedRoutes: CustomRoute[] = [
  {
    id: "root",
    path: "/",
    element: <AuthGuard />,
    errorElement: <ErrorWrapper />,
    handle: {
      title: "breadcrumb.home",
      hideOnSidebar: true,
      permissions: [Permissions.AllowAll]
    },
    children: [
      homeRoutes,
      dashboardRoutes,
    
      koggRoutes,
      immigrantsRoutes,
      reportRoutes,
      profileRoutes
    ]
  }
];

const filterRoutesByPermission = (routes: CustomRoute[]): CustomRoute[] => {
  // console.log("Filtering Routes by Permission", routes);
  const filtered = routes
    .filter((route) => checkUserPermission(route.handle?.permissions))
    .map((route) => {
      if (
        route.children &&
        Array.isArray(route.children) &&
        route.children.length > 0
      ) {
        return {
          ...route,
          children: filterRoutesByPermission(route.children) as CustomRoute[]
        } as CustomRoute;
      }
      return route as CustomRoute;
    });

  // console.log("Filtered Routes:", filtered);
  return filtered as CustomRoute[];
};

const routes = [...publicRoutes, ...filterRoutesByPermission(protectedRoutes)];

export { routes };
