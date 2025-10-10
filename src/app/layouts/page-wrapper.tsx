import { Flex } from "antd";
import type { PropsWithChildren } from "react";

export function CommonPageWrapper({ children }: PropsWithChildren) {
  return (
    <Flex
      vertical
      className="bg-[#F8FAFC] transition h-full w-full p-[24px] dark:bg-[#1F2135]"
    >
      {children}
    </Flex>
  );
}
