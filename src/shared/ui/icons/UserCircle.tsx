import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import Icon from "@ant-design/icons/lib/components/Icon";
import type { ReactElement } from "react";

const UserCircleSvg = () => (
  <svg viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4 20.8889C8.40432 16.2759 16.5483 16.0587 21 20.8889M17.213 7.72222C17.213 10.3302 15.0957 12.4444 12.484 12.4444C9.87228 12.4444 7.75505 10.3302 7.75505 7.72222C7.75505 5.11421 9.87228 3 12.484 3C15.0957 3 17.213 5.11421 17.213 7.72222Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export default function UserCircleIcon(
  props: Partial<CustomIconComponentProps>
): ReactElement {
  return <Icon component={UserCircleSvg} {...props} />;
}
