import type { InputProps } from "antd";
import { Input } from "antd";
import { cn } from "@/shared/lib/utils";

export function CustomInput({ className, ...rest }: InputProps) {
  return (
    <Input
      allowClear
      {...rest}
      className={cn(
        // Base styles
        "border border-[#E5E7EB] rounded-xl h-[40px] w-full px-[10px] text-[#1E1E1E] text-sm font-normal shadow-sm",
        // Dark mode
        "dark:border-[#3A405A] !transition-all dark:bg-[#2B3048] dark:text-[#B7BFD5] dark:placeholder:!text-[#FFFFFF]",
        className
      )}
    />
  );
}
