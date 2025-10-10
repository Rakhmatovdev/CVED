import type { LinkProps } from "react-router";
import { Link } from "react-router";
import { cn } from "@/shared/lib/utils.ts";

export const AppBreadcrumbItem = (props: LinkProps) => {
  return (
    <Link
      {...props}
      className={cn("dark:text-[#777E90] transition-colors", props.className)}
    />
  );
};
