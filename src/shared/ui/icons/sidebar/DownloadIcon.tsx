import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import Icon from "@ant-design/icons/lib/components/Icon";
import type { ReactElement } from "react";

const downloadSvg = (): React.ReactElement => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 11.5L9 1.5M9 11.5C8.29977 11.5 6.99153 9.5057 6.5 9M9 11.5C9.70023 11.5 11.0085 9.5057 11.5 9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17 13.5C17 15.982 16.482 16.5 14 16.5H4C1.518 16.5 1 15.982 1 13.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function DownloadIcon(
  props: Partial<CustomIconComponentProps>
): ReactElement {
  return <Icon component={downloadSvg} {...props} />;
}
