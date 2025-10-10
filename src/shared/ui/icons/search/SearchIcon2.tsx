import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import type { ReactElement } from "react";

const SearchSvg = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.5 11.5L17 16"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export default function SearchIcon2(
  props: Partial<CustomIconComponentProps>
): ReactElement {
  return <Icon component={SearchSvg} {...props} />;
}
