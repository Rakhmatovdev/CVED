import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import Icon from "@ant-design/icons/lib/components/Icon";
import type { ReactElement } from "react";

const defaultIcon = (): React.ReactElement => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 9L5 5M16 12H22M12 16V22"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export default function DashboardIcon(
  props: Partial<CustomIconComponentProps>
): ReactElement {
  return <Icon component={defaultIcon} {...props} />;
}
