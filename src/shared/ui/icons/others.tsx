import { useState } from "react";
import { SvgProps } from "@/shared/ui/icons/SidebarIcons.tsx";

export function SelectArrowDownIcon(props: SvgProps) {
  const [isDark] = useState(() => document.body.classList.contains("dark"));
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke={isDark ? "#6B7280" : "#141B34"}
      {...props}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-chevron-down-icon lucide-chevron-down"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
