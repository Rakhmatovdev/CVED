export function formatNumber(
  value: number | string,
  locale: string = "ru-RU"
): string {
  if (value === null || value === undefined || value === "") return "-";

  const num = typeof value === "string" ? Number(value) : value;
  if (Number.isNaN(num)) return "-";

  const nf = new Intl.NumberFormat(locale, {
    useGrouping: true,
    minimumFractionDigits: 0,
    maximumFractionDigits: 20
  });

  let formatted = nf.format(num);

  formatted = formatted.replace(",", ".");

  if (formatted.includes(".")) {
    formatted = formatted.replace(/\.?0+$/, "");
  }

  return formatted;
}
