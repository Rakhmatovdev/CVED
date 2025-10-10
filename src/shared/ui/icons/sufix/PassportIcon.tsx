import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import Icon from "@ant-design/icons/lib/components/Icon";
import type { ReactElement } from "react";

const DocumentSvg = () => (
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
        d="M7.96729 14.1662C9.7304 14.1662 10.612 14.1662 11.2449 13.662C11.8778 13.1578 12.0797 12.2946 12.4835 10.5683L13.7617 5.10413C13.9853 4.14858 14.097 3.6708 13.8941 3.32476C13.5256 2.69635 12.5863 2.83283 11.9733 2.83283"
        // stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M0.666992 5.49967C0.666992 3.29979 0.666992 2.19984 1.35041 1.51643C2.03383 0.833008 3.13377 0.833008 5.33366 0.833008H7.33366C9.53355 0.833008 10.6335 0.833008 11.3169 1.51643C12.0003 2.19984 12.0003 3.29979 12.0003 5.49967V9.49967C12.0003 11.6996 12.0003 12.7995 11.3169 13.4829C10.6335 14.1663 9.53355 14.1663 7.33366 14.1663H5.33366C3.13377 14.1663 2.03383 14.1663 1.35041 13.4829C0.666992 12.7995 0.666992 11.6996 0.666992 9.49967V5.49967Z"
        // stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M6.33366 3.5C7.80642 3.5 9.00033 4.69391 9.00033 6.16667C9.00033 7.63943 7.80642 8.83333 6.33366 8.83333M6.33366 3.5C4.8609 3.5 3.66699 4.69391 3.66699 6.16667C3.66699 7.63943 4.8609 8.83333 6.33366 8.83333M6.33366 3.5C5.78137 3.5 5.33366 4.69391 5.33366 6.16667C5.33366 7.63943 5.78137 8.83333 6.33366 8.83333M6.33366 3.5C6.88594 3.5 7.33366 4.69391 7.33366 6.16667C7.33366 7.63943 6.88594 8.83333 6.33366 8.83333"
        // stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M4.00049 10.833H8.66715"
        // stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </g>
  </svg>
);

export default function PassportIcon(
  props: Partial<CustomIconComponentProps>
): ReactElement {
  return <Icon component={DocumentSvg} {...props} />;
}
