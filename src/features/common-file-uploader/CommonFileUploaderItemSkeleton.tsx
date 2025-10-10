import { Flex, Skeleton } from "antd";

export function CommonFileUploaderItemSkeleton() {
  return (
    <Flex gap={13} className="relative border h-[98px] rounded-xl p-4">
      <Skeleton.Avatar
        active
        shape="square"
        size={48}
        className="!rounded-md"
      />
      <Skeleton.Input active size="small" className="w-full" />
      <Skeleton.Input active size="small" className="w-2/3" />
    </Flex>
  );
}
