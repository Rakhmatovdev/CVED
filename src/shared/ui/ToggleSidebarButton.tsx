import { Button, ButtonProps } from "antd";
import ToggleSidebarIcon from "./icons/header/ToggleSidebarIcon";

export default function ToggleSidebarButton(props: ButtonProps) {
  return (
    <Button
      type="link"
      className="!w-[22px] mt-px mr-3 -ml-2 !h-[28px] active:!bg-zinc-100 hover:!bg-zinc-50 dark:active:!bg-[#3A3F55] dark:hover:!bg-[#3A3F55]"
      {...props}
    >
      <ToggleSidebarIcon className="*:*:stroke-[#B7BFD5] text-secondary dark:text-[#777E90]" />
    </Button>
  );
}
