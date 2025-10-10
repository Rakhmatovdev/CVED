interface DetailRowProps {
  label: string;
  value?: React.ReactNode;
  valueClass?: string;
  Class?: string;
  icon?: React.ReactNode;
}
export default function DetailRow({
  label,
  value,
  valueClass = "",
  Class = "",
  icon
}: DetailRowProps) {
  return (
    <div className={`flex justify-between ${Class}`}>
      <span
        className={`text-lighter font-medium dark:text-dlighter ${icon ? "flex items-center gap-2" : ""}`}
      >
        {icon} {label}
      </span>
      <span
        className={`text-right font-medium text-primary dark:text-dprimary ${valueClass}`}
      >
        {value ?? "-"}
      </span>
    </div>
  );
}
