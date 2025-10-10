import { Button, Flex, Image } from "antd";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";
import { useSidebarStore } from "@/widgets/app-sidebar/model/store.ts";
import IIVLogo from "/logo/iiv-logo.svg";

export function SidebarFooter() {
  const { collapsed } = useSidebarStore();
  const { t } = useTranslation();

  return (
    <Button
      className={twMerge(
        "w-full transition border rounded-[8px] h-auto flex items-center justify-start gap-2 overflow-hidden",
        "border-[#E9E9E9] dark:!border-[#3A405A] dark:!bg-[#1E2035] dark:hover:bg-[#1E2035]",
        collapsed ? "p-0" : "p-2"
      )}
    >
      <div className="size-[36px] min-w-[36px] rounded-[7px]">
        <Image src={IIVLogo} preview={false} />
      </div>
      {!collapsed && (
        <Flex vertical className="items-start">
          <div className="text-[#171429] transition dark:text-white text-sm font-semibold leading-[18px]">
            {t("breadcrumb.user")}
          </div>
          <div className="text-[#69757A] transition dark:text-[#B7BFD5] text-xs leading-[15px]">
            {t("breadcrumb.role")}
          </div>
        </Flex>
      )}
    </Button>
  );
}
