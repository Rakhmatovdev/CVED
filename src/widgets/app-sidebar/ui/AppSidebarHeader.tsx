import { Flex } from "antd";
import { Link } from "react-router";
import { twMerge } from "tailwind-merge";
import EovirIcon from "@/shared/ui/icons/Eovir.tsx";
import { LogoIcon } from "@/shared/ui/icons/SidebarIcons.tsx";
import ToggleSidebarButton from "@/shared/ui/ToggleSidebarButton";
import { useSidebarStore } from "@/widgets/app-sidebar/model/store.ts";

export function SidebarHeader() {
  const { collapsed, toggleSidebar } = useSidebarStore();
  return (
    <Flex
      className={twMerge(
        "items-center transition-all duration-300 justify-between w-full",
        collapsed ? "ml-1" : "ml-2"
      )}
    >
      <Flex gap={8} className="items-center">
        <LogoIcon className={collapsed ? "-ml-1.5" : ""} />
        <Link
          to="/"
          className={twMerge(
            "cursor-pointer self-center mt-1 text-secondary dark:text-dvalue transition-all duration-300 overflow-hidden",
            collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
          )}
        >
          <EovirIcon />
        </Link>
      </Flex>
      {!collapsed && <ToggleSidebarButton onClick={toggleSidebar} />}
    </Flex>
  );
}
