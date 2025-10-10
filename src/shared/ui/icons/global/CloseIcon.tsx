import Icon from "@ant-design/icons/lib/components/Icon";
import type { ReactElement } from "react";

const CloseSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="17"
    viewBox="0 0 16 17"
    fill="none"
  >
    <path
      d="M12 4.5L4 12.5"
      stroke="#1F2937"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M4 4.5L12 12.5"
      stroke="#1F2937"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default function CloseIcon(): ReactElement {
  return <Icon component={CloseSvg} />;
}
