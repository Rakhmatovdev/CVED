import Icon from "@ant-design/icons/lib/components/Icon";
import type { ReactElement } from "react";

const ChevronDownSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M5 7.50004L10 12.5L15 7.5"
      stroke="#232E40"
      stroke-width="1.25"
      stroke-miterlimit="16"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default function ChevronDownIcon(): ReactElement {
  return <Icon component={ChevronDownSvg} />;
}
