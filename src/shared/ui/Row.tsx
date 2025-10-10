import { cn } from "@/shared/lib/utils";

const Row = ({
  label,
  value,
  dir,
  labelClassName,
  valueClassName
}: {
  label: string;
  value: string | React.ReactNode;
  dir?: "row" | "col";
  labelClassName?: string;
  valueClassName?: string;
}) => {
  return (
    <div
      className={cn(
        "",
        dir === "row"
          ? "flex-row gap-2 flex justify-between items-center"
          : "flex-col"
      )}
    >
      <p
        className={cn(
          "text-base text-[#6B7280] font-normal dark:text-zinc-400",
          labelClassName
        )}
      >
        {label}
      </p>
      <p
        className={cn(
          "text-base font-medium dark:text-zinc-300",
          valueClassName
        )}
      >
        {value || "-"}
      </p>
    </div>
  );
};

export default Row;
