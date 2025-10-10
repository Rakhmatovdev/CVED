import "./sidebar.css";
import { ConfigProvider, Flex, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, matchPath, RouteObject, useLocation } from "react-router";
import { twMerge } from "tailwind-merge";
import { routes } from "@/routes/routes.tsx";
import { isDevelopment } from "@/shared/config";
import { cn } from "@/shared/lib/utils.ts";
import { CustomRoute } from "@/shared/types";
import { ArrowDownIcon } from "@/shared/ui/icons/SidebarIcons";
import useDarkMode from "@/utils/hooks/useDarkMode.tsx";
import { SIDEBAR_WIDTH } from "@/widgets/app-sidebar/model/constants.ts";
import { useSidebarStore } from "@/widgets/app-sidebar/model/store.ts";
import { SidebarFooter } from "@/widgets/app-sidebar/ui/AppSidebarFooter.tsx";
import { SidebarHeader } from "@/widgets/app-sidebar/ui/AppSidebarHeader.tsx";

const MENU_THEME = {
  components: {
    Menu: {
      activeBarBorderWidth: 0,
      itemHoverBg: "#F5F6FA",
      itemSelectedBg: "#F8F8FA",
      itemSelectedColor: "#232E40",
      subMenuItemBg: "transparent",
      itemColor: "#69757A",
      padding: 0,
      paddingSM: 0,
      paddingXL: 0
    }
  }
};

const DARK_MENU_THEME = {
  components: {
    Menu: {
      itemColor: "#A0AEC0",
      itemHoverBg: "#283459",
      itemSelectedBg: "#2C3E6D",
      itemSelectedColor: "#EDF2F7",
      subMenuItemBg: "transparent"
    }
  }
};

function filterForSidebar(routes: RouteObject[]) {
  return routes
    ?.map((route) => {
      if (route.handle?.hideOnSidebar) return null;
      if (route.handle?.devOnly && !isDevelopment) return null;
      const children = route.children ? filterForSidebar(route.children) : [];
      return {
        ...route,
        children
      };
    })
    .filter(Boolean);
}

export default function AppSidebar() {
  // Helpers
  const { t } = useTranslation();
  const location = useLocation();
  const { isDarkMode } = useDarkMode();
  const sidebarRoutes = useMemo(() => {
    const drawableRoutes = routes.find((route) => route.path === "/");
    if (!drawableRoutes.children.length) return [];
    return filterForSidebar(drawableRoutes.children);
  }, [routes]);

  // Store
  const { collapsed, toggleSidebar } = useSidebarStore();

  // States
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [arm, setArm] = useState(100);

  // Effects
  useEffect(() => {
    const activeParent = sidebarRoutes.find((item) =>
      item.children?.some(
        (child) =>
          matchPath(
            { path: `${item.path}/${child.path}`, end: false },
            location.pathname
          ) !== null
      )
    );

    if (activeParent) {
      setOpenKeys([`submenu-${sidebarRoutes.indexOf(activeParent)}`]);
    } else {
      setOpenKeys([]);
    }
  }, [location.pathname, sidebarRoutes]);

  useEffect(() => {
    if (arm <= 0) setArm(100);
  }, [arm]);

  // Functions
  const isActiveLink = (link?: string) => link && location.pathname === link;

  const menuItems = useMemo(() => {
    return sidebarRoutes.map((route, index) => {
      const isDropdown = route.type === "dropdown";
      const children = route.children;
      const handle = route.handle;

      if (isDropdown) {
        return {
          key: `submenu-${index}`,
          icon: handle?.icon?.({
            active: isActiveLink(route.path) ? "active" : "",
            className: isParentActive(children)
              ? "text-[#2563EB]"
              : "*:*:stroke-[#777E90]"
          }),
          label: !collapsed && (
            <span className="font-medium">{t(handle?.title)}</span>
          ),
          children: children?.map((child) => ({
            key: `${route.path}/${child.path}`,
            label: (
              <Link
                to={`${route.path}/${child.path}`}
                className="font-medium pl-2"
              >
                {t(child.handle?.title)}
              </Link>
            )
          }))
        };
      } else {
        return {
          key: route.path || `item-${index}`,
          icon: handle?.icon?.({
            active: isActiveLink(route.path) ? "active" : "",
            className: isActiveLink(route.path)
              ? "*:*:stroke-[#3276FF]"
              : "*:*:stroke-[#777E90]"
          }),
          label: (
            <Link
              to={route.path!}
              className={cn(
                "flex items-center gap-2 text-sm font-medium rounded-md",
                isActiveLink(route.path) && "!text-[#3276FF]"
              )}
            >
              {t(handle.title)}
              {(t(handle.title) === "Заявки" ||
                t(handle.title) === "Новости") &&
                arm > 0 && (
                  <div
                    className={`rounded-md ml-auto transition-colors font-medium text-xs h-5 border px-1 flex items-center ${
                      isActiveLink(route?.path)
                        ? "border-[#8FB3FF] text-[#3276FF] dark:bg-[#2C375A] dark:border-[#2F56AC] bg-[#EBF1FF]"
                        : "border-[#8FB3FF] text-[#3276FF] dark:bg-[#2C375A] dark:border-[#2F56AC] bg-[#EBF1FF]"
                    }`}
                  >
                    {collapsed ? "" : arm > 99 ? "99+" : arm}
                  </div>
                )}
            </Link>
          )
        };
      }
    });
  }, [collapsed, arm, location, t]);

  function isParentActive(children?: RouteObject[] & CustomRoute[]) {
    return children?.some((child) => isActiveLink(child.path)) || false;
  }

  const handleOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  const normalizePath = (p: string) => {
    const parts = p.split("/").filter(Boolean); // split & remove empty
    if (
      parts.length > 1 &&
      ["add", "edit", "new"].includes(parts[parts.length - 1])
    ) {
      parts.pop(); // remove last segment if add/edit
    }
    return "/" + parts.join("/");
  };

  const selectedKey = useMemo(() => {
    const normalized = normalizePath(location.pathname);

    // First, try exact match
    const allKeys: string[] = [];
    menuItems.forEach((item) => {
      if (item.children) {
        item.children.forEach((child) => allKeys.push(child.key as string));
      } else {
        allKeys.push(item.key as string);
      }
    });

    // Check for exact match first
    if (allKeys.includes(normalized)) {
      return normalized;
    }

    // If no exact match, find the longest matching prefix
    const matchingKey = allKeys
      .filter((key) => location.pathname.startsWith(key))
      .sort((a, b) => b.length - a.length)[0];

    return matchingKey || normalized;
  }, [location.pathname, menuItems]);

  return (
    <Sider
      width={SIDEBAR_WIDTH}
      collapsedWidth={60}
      collapsible
      collapsed={collapsed}
      onCollapse={toggleSidebar}
      trigger={null}
      className="h-dvh sticky top-0"
    >
      <Flex className="custom-app-sidebar">
        <Flex vertical>
          <SidebarHeader />
          {/* Menu */}
          <div className="overflow-y-auto mt-6 transition-all -mr-3 h-[calc(100vh-150px)] scroll-smooth [scrollbar-gutter:stable]">
            <ConfigProvider theme={isDarkMode ? DARK_MENU_THEME : MENU_THEME}>
              <Menu
                mode="inline"
                inlineCollapsed={collapsed}
                openKeys={openKeys}
                selectedKeys={[selectedKey]}
                onOpenChange={handleOpenChange}
                items={menuItems}
                className={twMerge(
                  "custom-app-sidebar-menu transition",
                  collapsed ? "collapsed" : "expanded"
                )}
                expandIcon={({ isOpen }) => (
                  <ArrowDownIcon
                    className={`transition absolute top-1/2 right-2 w-[10px] text-current -translate-y-1/2 ${isOpen ? "rotate-180" : "rotate-0"} ${collapsed ? "hidden" : "block"}`}
                  />
                )}
              />
            </ConfigProvider>
          </div>
        </Flex>
        <SidebarFooter />
      </Flex>
    </Sider>
  );
}
