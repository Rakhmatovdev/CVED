import type { ReactNode } from "react";

interface IDetailRowProps {
  label: string;
  value?: string;
  valueComponent?: ReactNode;
  valueClass?: string;
}

export function CommonDetailRow({
  label,
  valueComponent,
  value,
  valueClass = ""
}: IDetailRowProps) {
  return (
    <div className="flex transition justify-between">
      <span className="transition text-[#6B7280] dark:text-dvalue">
        {label}
      </span>
      {valueComponent || <span className={valueClass}>{value ?? "-"}</span>}
    </div>
  );
}
