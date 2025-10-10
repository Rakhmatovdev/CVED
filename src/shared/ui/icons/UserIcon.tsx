import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import Icon from "@ant-design/icons/lib/components/Icon";
import type { ReactElement } from "react";

const UserSvg = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="#6B7280"
  >
    <g id="elements">
      <path
        d="M0.833008 7.50033C0.833008 4.51476 0.833008 3.02198 1.7605 2.09449C2.688 1.16699 4.18078 1.16699 7.16634 1.16699C10.1519 1.16699 11.6447 1.16699 12.5722 2.09449C13.4997 3.02198 13.4997 4.51476 13.4997 7.50033C13.4997 10.4859 13.4997 11.9787 12.5722 12.9062C11.6447 13.8337 10.1519 13.8337 7.16634 13.8337C4.18078 13.8337 2.688 13.8337 1.7605 12.9062C0.833008 11.9787 0.833008 10.4859 0.833008 7.50033Z"
        // stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M4.1665 10.8337C5.72097 9.20554 8.59533 9.12888 10.1665 10.8337M8.8299 5.83366C8.8299 6.75413 8.08264 7.50033 7.16086 7.50033C6.23907 7.50033 5.49182 6.75413 5.49182 5.83366C5.49182 4.91318 6.23907 4.16699 7.16086 4.16699C8.08264 4.16699 8.8299 4.91318 8.8299 5.83366Z"
        // stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </g>
  </svg>
);

export default function UserIcon(
  props: Partial<CustomIconComponentProps>
): ReactElement {
  return <Icon component={UserSvg} {...props} />;
}
