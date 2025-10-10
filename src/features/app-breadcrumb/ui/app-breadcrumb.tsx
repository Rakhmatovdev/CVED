import { Breadcrumb } from "antd";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import { useAppBreadcrumbStore } from "@/features/app-breadcrumb/model/store.ts";
import { AppBreadcrumbItem } from "@/features/app-breadcrumb/ui/app-breadcrumb-item.tsx";
import { useRouteMatches } from "@/shared/hooks/use-route-matches.tsx";
import { ArrowDownIcon } from "@/shared/ui/icons/SidebarIcons.tsx";

function AppBreadcrumb() {
  // Helpers
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { breadcrumbs } = useRouteMatches();

  // Store
  const { nextItems } = useAppBreadcrumbStore();

  // Functions
  const generatedItems = useMemo(() => {
    return breadcrumbs.map((crumb, index) => {
      const isLast = index === breadcrumbs.length - 1;

      return {
        title: isLast ? (
          <span className="transition">
            {t(crumb.title, Number(crumb) >= 0 ? crumb.title : crumb.title)}
          </span>
        ) : crumb.handle?.breadCrumbDisabled ? (
          t(crumb.title, Number(crumb) >= 0 ? crumb.title : crumb.title)
        ) : (
          <AppBreadcrumbItem
            to={crumb.pathname}
            key={index}
            className={
              crumb.pathname !== "/dashboard" ? "dark:!text-white" : ""
            }
          >
            {t(crumb.title, Number(crumb) >= 0 ? crumb.title : crumb.title)}
          </AppBreadcrumbItem>
        )
      };
    });
  }, [pathname, t]);

  // const homeItem = {
  //   title: (
  //     <AppBreadcrumbItem
  //       to="/"
  //       className={!generatedItems.length && "text-[#1F2937]"}
  //     >
  //       {t("breadcrumb.home")}
  //     </AppBreadcrumbItem>
  //   )
  // };

  const items = useMemo(
    () => [...generatedItems, ...nextItems],
    [generatedItems, nextItems]
  );

  return (
    <Breadcrumb
      className="*:transition"
      separator={
        <ArrowDownIcon className="mt-[9px] transition transform -rotate-90" />
      }
      items={items}
    />
  );
}

export default AppBreadcrumb;
