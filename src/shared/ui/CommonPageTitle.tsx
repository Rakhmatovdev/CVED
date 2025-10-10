import type { FlexProps } from "antd";
import { Flex } from "antd";
import { twMerge } from "tailwind-merge";

export function CommonPageTitle({ children, className, ...props }: FlexProps) {
  return (
    <Flex {...props} className={twMerge("mb-6", className)}>
      <div className="text-[#1F2937] transition text-2xl font-semibold leading-[30px] dark:text-white">
        {children}
      </div>
    </Flex>
  );
}
