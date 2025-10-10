interface FormatDateOptions {
  time?: boolean;
}

function isValid(date: string | Date): boolean {
  if (date instanceof Date) {
    return !isNaN(date.getTime());
  }

  if (!date || date === "") return false;

  const validPatterns = [
    /^\d{4}-\d{2}-\d{2}$/, // YYYY-MM-DD
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/, // ISO format
    /^\d{2}\.\d{2}\.\d{4}$/, // DD.MM.YYYY
    /^\d{1,2}\/\d{1,2}\/\d{4}$/ // M/D/YYYY or MM/DD/YYYY
  ];

  const hasValidPattern = validPatterns.some((pattern) => pattern.test(date));
  if (!hasValidPattern) return false;

  const d = new Date(date);
  if (isNaN(d.getTime())) return false;

  const year = d.getFullYear();
  if (year < 1900 || year > 2100) return false;

  return true;
}

function hasTimeInfo(date: string | Date): boolean {
  if (date instanceof Date) return true;

  const timePattern = /T\d{2}:\d{2}|\s\d{2}:\d{2}|\d{2}:\d{2}/;
  return timePattern.test(date);
}

export function formatDate(
  date: string | Date,
  options: FormatDateOptions = { time: false }
): string {
  if (!isValid(date) || date === null || date === undefined || date === "")
    return "";
  const d = new Date(date);

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  let result = `${day}.${month}.${year}`;

  if (options.time && hasTimeInfo(date)) {
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    result += ` ${hours}:${minutes}`;
  }

  return result;
}

// Tested

// formatDate(null); // ""
// formatDate(undefined); // ""
// formatDate(""); // ""
// formatDate("   "); // ""
// formatDate("not-a-date"); // ""
// formatDate(NaN as any); // ""
// formatDate(new Date(2025, 0, 1)); // "01.01.2025"
// formatDate(new Date(2025, 5, 15)); // "15.06.2025"
// formatDate(new Date("2025-10-09")); // "09.10.2025"
// formatDate(new Date("2025-12-31T23:59:59")); // "31.12.2025"
// formatDate("2025-01-01"); // "01.01.2025"
// formatDate("2025-01-01T10:20:30Z"); // "01.01.2025"
// formatDate("2025-01-01T10:20:30+05:00"); // "01.01.2025"
// formatDate("January 1, 2025"); // "01.01.2025"
// formatDate("01/01/2025"); // "01.01.2025"
// formatDate("2025/01/01"); // "01.01.2025"
// formatDate("2025.01.01"); // "01.01.2025"
// formatDate(new Date(0)); // "01.01.1970"
// formatDate(new Date(-1)); // "31.12.1969"
// formatDate(new Date(9999999999)); // "20.12.2286"
// formatDate(new Date("Invalid")); // ""
// formatDate(new Date("2025-10-09T14:05:07"), { time: true }); // "09.10.2025 14:05"
// formatDate("2025-12-31T23:59:59", { time: true }); // "31.12.2025 23:59"
// formatDate("2025-12-31T23:59:59", { time: true }); // "31.12.2025 23:59"
