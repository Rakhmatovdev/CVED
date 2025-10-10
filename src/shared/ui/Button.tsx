import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../lib/utils";

const buttonVariants = cva(
  "shadow-[0_0_0_1px_rgba(10,13,18,0.02)_inset,0_-1px_0_0_rgba(10,13,18,0.0075)_inset,0_1px_1px_0_rgba(10,13,18,0.0075)] inline-flex items-center justify-center disabled:cursor-not-allowed gap-2 font-medium duration-200 transition-all disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-white text-black border border-[#d7d7d8] hover:bg-[#F8F8FA] font-medium dark:bg-dcontent dark:text-white dark:border-dborder",
        primary:
          "bg-bluePrimary text-white [&_svg]:stroke-[#fff] border border-[#3160c9] outline-[1px] outline-[#3971ed] -outline-offset-[2.5px] hover:bg-bluePrimary/90 has-[>svg]:text-[#fff] has-[>svg]:stroke-[#fff]",
        destructive:
          "bg-destructive text-white border border-destructive/90 outline-[1px] outline-red-500/60 -outline-offset-[2.5px] hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-bluePrimary dark:hover:bg-input/50",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 shadow-none",
        link: "text-bluePrimary underline-offset-4 underline decoration-bluePrimary hover:underline",
        secondary: "bg-bluePrimary/20 text-bluePrimary",
        phantom:
          "text-primary dark:text-dprimary dark:bg-dbody my-border dark:border-dborder hover:bg-bluePrimary/5 dark:hover:bg-bluePrimary/5"
      },
      size: {
        default: "h-10 px-4 py-2",
        xs: "h-6 gap-1.5 px-1",
        sm: "h-8 gap-1.5 px-3",
        md: "h-9 gap-1.5 px-[14px]",
        lg: "h-12 px-6",
        icon: "h-10 min-w-10"
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto"
      },
      radius: {
        default: "rounded-xl",
        sm: "rounded-lg",
        lg: "rounded-2xl",
        xs: "rounded-md"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      radius: "default",
      fullWidth: false
    }
  }
);

export interface IButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

const Button = ({
  className,
  variant,
  size,
  fullWidth,
  radius,
  loading = false,
  children,
  ...props
}: IButtonProps) => {
  return (
    <button
      data-slot="button"
      disabled={loading || props.disabled}
      className={cn(
        buttonVariants({ variant, size, fullWidth, radius }),
        className
      )}
      {...props}
    >
      {loading ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-spin size-5"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
      ) : (
        children
      )}
    </button>
  );
};
export default Button;
