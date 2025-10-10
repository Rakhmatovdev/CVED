import clsx from "clsx";
import React from "react";

type FlagProps = {
  code: string;
  size?: "sm" | "md" | "lg";
  rounded?: boolean;
  className?: string;
};

const sizeMap = {
  sm: "!w-[40px] !h-[30px]",
  md: "!w-[48px] !h-[36px]",
  lg: "!w-[60px] !h-[45px]"
};

export const Flag: React.FC<FlagProps> = ({ code, size = "md", className }) => {
  if (!code) return null;

  return (
    <span
      className={clsx(
        `fi fi-${code.toLowerCase()}`,
        sizeMap[size],
        "!inline-block !aspect-[4/3] !rounded-lg !shadow-[0_1px_2px_0_rgba(10,13,18,0.05),0_0_0_1px_rgba(10,13,18,0.18)_inset,0_-2px_0_0_rgba(10,13,18,0.05)_inset]",
        className
      )}
    />
  );
};
