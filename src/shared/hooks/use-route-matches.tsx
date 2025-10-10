import type { UIMatch } from "react-router";
import { useMatches } from "react-router";
import type { IRouteHandle } from "@/shared/types";

interface ICustomUIMatch extends Omit<UIMatch, "handle"> {
  handle?: IRouteHandle;
}

interface IBreadcrumbItem {
  id: string;
  pathname: string;
  title: string;
  icon?: IRouteHandle["icon"];
  handle: IRouteHandle;
  isActive: boolean;
}

interface IUseRouteMatchesReturn {
  // Core matches
  matches: ICustomUIMatch[];
  currentMatch: ICustomUIMatch | null;

  // Breadcrumbs
  breadcrumbs: IBreadcrumbItem[];

  // Route info
  // routeHierarchy: string[];
  // activePermissions: string[];

  // Utilities
  // hasPermission: (permission: string) => boolean;
  // isDevRoute: boolean;
  // shouldShowInSidebar: boolean;

  // Data helpers
  // getRouteData: <T = any>(routeId?: string) => T | undefined;
  // findMatchByPath: (path: string) => ICustomUIMatch | undefined;
  // findMatchById: (id: string) => ICustomUIMatch | undefined;
}

export function useRouteMatches(): IUseRouteMatchesReturn {
  const matches = useMatches() as ICustomUIMatch[];
  const currentMatch = matches[matches.length - 1] || null;

  // Generate breadcrumbs
  const breadcrumbs: IBreadcrumbItem[] = matches
    .filter((match) => !match.handle?.noBreadCrumb)
    .map((match, index) => ({
      id: match.id,
      pathname: match.pathname,
      title: match.handle?.title || "",
      icon: match.handle?.icon,
      handle: match.handle!,
      isActive: index === matches.length - 1
    }));

  // // Route hierarchy as array of route IDs
  // const routeHierarchy = matches.map((match) => match.id);
  //
  // // Collect all permissions from current route hierarchy
  // const activePermissions = matches
  //   .flatMap((match) => match.handle?.permissions || [])
  //   .filter((permission, index, arr) => arr.indexOf(permission) === index); // Unique
  //
  // // Check if user has specific permission
  // const hasPermission = (permission: string): boolean => {
  //   return (
  //     activePermissions.includes(permission) ||
  //     activePermissions.includes("AllowAll")
  //   );
  // };

  // const isDevRoute = matches.some((match) => match.handle?.devOnly === true);
  // const shouldShowInSidebar = currentMatch?.handle?.hideOnSidebar !== true;

  // Get route data with type safety
  // const getRouteData = <T = any,>(routeId?: string): T | undefined => {
  //   if (routeId) {
  //     const match = matches.find((m) => m.id === routeId);
  //     return match?.data as T;
  //   }
  //   return currentMatch?.data as T;
  // };
  //
  // // Find match by pathname
  // const findMatchByPath = (path: string): ICustomUIMatch | undefined => {
  //   return matches.find((match) => match.pathname === path);
  // };
  //
  // // Find match by route ID
  // const findMatchById = (id: string): ICustomUIMatch | undefined => {
  //   return matches.find((match) => match.id === id);
  // };

  return {
    // Core matches
    matches,
    currentMatch,

    // Breadcrumbs
    breadcrumbs

    // Route info
    // routeHierarchy,
    // activePermissions,

    // Utilities
    // hasPermission,
    // isDevRoute,
    // shouldShowInSidebar,

    // Data helpers
    // getRouteData,
    // findMatchByPath,
    // findMatchById,
  };
}
