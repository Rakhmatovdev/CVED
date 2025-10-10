import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import Icon from "@ant-design/icons/lib/components/Icon";
import type { ReactElement } from "react";

const CalendarSvg = () => (
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
        d="M11.5 0.833008V2.16634M3.5 0.833008V2.16634"
        // stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.49668 8.16602H7.50267M7.49668 10.8327H7.50267M10.1604 8.16602H10.1663M4.83301 8.16602H4.83899M4.83301 10.8327H4.83899"
        // stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.83301 4.83301H13.1663"
        // stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.1665 7.66216C1.1665 4.75729 1.1665 3.30486 2.00125 2.40243C2.836 1.5 4.1795 1.5 6.8665 1.5H8.13317C10.8202 1.5 12.1637 1.5 12.9984 2.40243C13.8332 3.30486 13.8332 4.75729 13.8332 7.66216V8.0045C13.8332 10.9094 13.8332 12.3618 12.9984 13.2642C12.1637 14.1667 10.8202 14.1667 8.13317 14.1667H6.8665C4.1795 14.1667 2.836 14.1667 2.00125 13.2642C1.1665 12.3618 1.1665 10.9094 1.1665 8.0045V7.66216Z"
        // stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.5 4.83301H13.5"
        // stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

export default function CalendarIcon(
  props: Partial<CustomIconComponentProps>
): ReactElement {
  return <Icon component={CalendarSvg} {...props} />;
}
