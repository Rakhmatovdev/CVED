import type { FlexProps } from "antd";
import { Flex } from "antd";
import { twMerge } from "tailwind-merge";

export function CommonPageWrapperCard({
  children,
  className,
  ...props
}: FlexProps) {
  return (
    <Flex
      {...props}
      className={twMerge(
        "border transition p-4 bg-white rounded-xl dark:bg-[#2B3048] dark:border-[#3A405A]",
        className
      )}
    >
      {children}
    </Flex>
  );
}
