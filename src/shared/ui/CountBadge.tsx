import type { FlexProps } from "antd";
import { Flex } from "antd";
import { twMerge } from "tailwind-merge";

interface IProps extends FlexProps {
  hidden?: boolean;
  count?: string | number;
}

export function CountBadge({ count, hidden, ...props }: IProps) {
  return (
    <Flex
      vertical
      {...props}
      className={twMerge(
        "border transition items-center mt-px px-2 dark:bg-dbody py-[2px] my-border rounded-md text-sm font-me shadow-sm dark:border-dborder dark:text-white",
        hidden && "hidden",
        props.className
      )}
    >
      {count}
    </Flex>
  );
}
