import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/shared/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-lg justify-center font-medium border px-2.5 py-1 font-medium text-sm w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1.5 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent transition bg-[#F2F4F7] text-[#717386] text-sm font-medium dark:bg-[#40455A] dark:border-transparent dark:text-white",
        info: "border-transparent bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
        transparent:
          "border-transparent transition bg-transparent text-blue-800 dark:text-white",
        destructive:
          "border-transparent transition bg-red-500 text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground dark:border-zinc-600 dark:text-zinc-300 transition [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        success:
          "border-transparent transition bg-[#CCFBF1] text-[#2CBE88] dark:bg-green-900/30 dark:text-green-400",
        warning:
          "border-transparent transition bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
        "destructive-light":
          "border-transparent dark:!text-[#FF4E4E] dark:bg-[#403349] !text-[#991B1B] transition bg-[#FECACA] text-white [a&]:hover:bg-destructive/70 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        "success-light":
          "border-transparent dark:!text-[#4DD282] dark:bg-[#2F434F] !text-[#4DD282] transition bg-[#E9F9F0] text-white [a&]:hover:bg-green/70 focus-visible:ring-green/20 dark:focus-visible:ring-green/40"
      },
      transparent: {
        true: ""
      },
      withIndicator: {
        true: "pl-1.5",
        false: ""
      },
      size: {
        default: "px-4 py-2 text-xs",
        sm: "px-2 py-1 text-sm",
        md: "px-3 py-1 text-base",
        lg: "px-4 py-2 text-lg",
        xl: "px-6 py-2 text-xl"
      }
    },
    defaultVariants: {
      variant: "default",
      withIndicator: false
    },
    compoundVariants: [
      {
        variant: "default",
        transparent: true,
        class: "bg-[#DBEAFE] text-[#2563EB] dark:text-blue-400"
      },
      {
        variant: "info",
        transparent: true,
        class: "bg-[#DBEAFE]/70 text-[#2563EB] dark:text-blue-400"
      },
      {
        variant: "destructive",
        transparent: true,
        class: "bg-red-500/20 text-red-500 dark:text-red-400"
      },
      {
        variant: "success",
        transparent: true,
        class: "bg-[#CCFBF1]/80 text-[#14B8A6] dark:text-green-400"
      },
      {
        variant: "warning",
        transparent: true,
        class: "bg-yellow-600/20 text-yellow-600 dark:text-amber-400"
      }
    ]
  }
);

const indicatorColors = {
  default: "bg-[#8B54FF]",
  success: "bg-green-500",
  warning: "bg-amber-500",
  error: "bg-red-500",
  info: "bg-blue-500"
};

export interface CustomBadgeProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof badgeVariants> {
  indicator?: boolean | string;
  indicatorColor?: keyof typeof indicatorColors | string;
  indicatorColorClass?: string;
}

function CustomBadge({
  className,
  variant = "default",
  indicator = false,
  indicatorColor,
  indicatorColorClass,
  transparent,
  children,
  size,
  ...props
}: CustomBadgeProps) {
  const isCustomColor =
    indicatorColor && !Object.keys(indicatorColors).includes(indicatorColor);
  const colorClass =
    indicatorColor && !isCustomColor
      ? indicatorColors[indicatorColor as keyof typeof indicatorColors]
      : "";

  return (
    <span
      data-slot="badge"
      className={cn(
        badgeVariants({
          variant,
          withIndicator: !!indicator,
          transparent,
          size,
          className
        })
      )}
      {...props}
    >
      {indicator && (
        <span
          className={cn(
            "w-4 h-4 rounded transition",
            !isCustomColor && colorClass,
            indicatorColorClass
          )}
          style={{
            ...(indicatorColor &&
            (indicatorColor.includes("gradient(") ||
              indicatorColor.includes("linear-gradient("))
              ? {
                  background: indicatorColor
                }
              : {}),
            ...(indicatorColor && !indicatorColor.includes("gradient")
              ? {
                  backgroundColor: indicatorColor
                }
              : {})
          }}
        />
      )}
      {children}
    </span>
  );
}

export default CustomBadge;
