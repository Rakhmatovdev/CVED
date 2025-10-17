import { Divider, Dropdown, Flex } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { useAuthStore } from "@/entities/auth/model/store.ts";
import AppBreadcrumb from "@/features/app-breadcrumb/ui/app-breadcrumb.tsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/Avatar";
import DownArrowIcon from "@/shared/ui/icons/DownArrowIcon.tsx";
import { LanguageChanger } from "@/shared/ui/LanguageChanger.tsx";
import { ThemeChanger } from "@/shared/ui/ThemeChanger.tsx";
import ToggleSidebarButton from "@/shared/ui/ToggleSidebarButton";
import { useUser } from "@/utils/hooks/useUser.ts";
import { useSidebarStore } from "@/widgets/app-sidebar/model/store.ts";
import { useEffect } from "react";

export default function AppHeader() {
  // Helpers
  const { t } = useTranslation();
  const { user } = useUser();
  const { logOut } = useAuthStore();

  // Store
  const { collapsed, toggleSidebar } = useSidebarStore();

  // Functions
  const menuItems = [
    {
      key: "profile",
      label: (
        <Link to={"/profile"}>
          <p className="dark:text-white text-secondary">
            {t("statics.profile")}
          </p>
        </Link>
      )
    },
    {
      key: "logout",
      label: (
        <button
          onClick={logOut}
          className="dark:text-white w-full h-full flex flex-start text-secondary"
        >
          {t("statics.logout")}
        </button>
      )
    }
  ];
useEffect(() => {
const Control=()=>{
    if(JSON.parse(localStorage.getItem('user')).last_name) {
      logOut()
    }
      
}
Control()
}, [])


  return (
    <Flex
      className={`px-6 sticky top-0 z-50 transition-colors min-h-[62px] dark:bg-[#2B3048] dark:border-[#3A405A] dark:border-b-[#3A405A] bg-white border-b border-[#E5E7EB] w-full items-center justify-between`}
    >
      <Flex align="center">
        {collapsed && <ToggleSidebarButton onClick={toggleSidebar} />}
        <AppBreadcrumb />
      </Flex>

      <Flex className="items-center gap-[20px]">
        <ThemeChanger />
        <LanguageChanger />

        <Divider
          type="vertical"
          className="h-[24px] transition w-[1px] dark:bg-[#777E90] bg-[#E5E7EB]"
        />

        <Dropdown
          menu={{ items: menuItems }}
          placement="bottomRight"
          trigger={["click"]}
        >
          <div className="flex transition items-center gap-[12px] dark:text-[#fff] text-[#1F2937] text-[15px] font-[600] h-auto cursor-pointer">
            <Avatar>
              <AvatarImage src={user?.photo} alt="User" />
              <AvatarFallback>
                {user?.first_name?.slice(0, 1) + user?.last_name?.slice(0, 1)}
              </AvatarFallback>
            </Avatar>
            <div className="text-[#1F2937] transition dark:text-white">
              {user?.first_name} {user?.last_name}
            </div>
            <DownArrowIcon />
          </div>
        </Dropdown>
      </Flex>
    </Flex>
  );
}
