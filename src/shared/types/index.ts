import type { ReactNode, SVGProps } from "react";
import type { IndexRouteObject, NonIndexRouteObject } from "react-router";
import type { PermissionString } from "@/shared/config/permissions/permissions.ts";

interface IRouteHandle {
  // View
  title?: string;
  icon?: (
    props?: SVGProps<SVGSVGElement> & { active?: "active" | "" }
  ) => ReactNode;
  link?: string;

  // Configs
  devOnly?: boolean;
  hideOnSidebar?: boolean;
  ignoreChildren?: boolean;
  keepSearchParams?: boolean;
  noBreadCrumb?: boolean;
  breadCrumbDisabled?: boolean;
  // Auth
  permissions?: PermissionString[];
  // allowedRoles?: string[];
}

interface CustomNonIndexRouteObject
  extends Omit<NonIndexRouteObject, "children"> {
  handle?: IRouteHandle;
  children?: CustomRoute[];
  type?: "item" | "dropdown";
}

interface CustomIndexRouteObject extends IndexRouteObject {
  handle?: IRouteHandle;
  type?: "item";
}

type CustomRoute = CustomIndexRouteObject | CustomNonIndexRouteObject;

export type { CustomRoute, IRouteHandle };
