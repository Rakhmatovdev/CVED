import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import Icon from "@ant-design/icons/lib/components/Icon";
import type { ReactElement } from "react";

const LocationSvg = () => (
  <svg
    width="12"
    height="15"
    viewBox="0 0 12 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="#6B7280"
  >
    <g id="elements">
      <g id="content">
        <path
          d="M7.8335 5.83301C7.8335 6.93758 6.93807 7.83301 5.8335 7.83301C4.72893 7.83301 3.8335 6.93758 3.8335 5.83301C3.8335 4.72844 4.72893 3.83301 5.8335 3.83301C6.93807 3.83301 7.8335 4.72844 7.8335 5.83301Z"
          // stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M5.8335 0.833008C8.53936 0.833008 10.8335 3.11836 10.8335 5.89094C10.8335 8.70768 8.50201 10.6843 6.3485 12.0285C6.19156 12.1188 6.01408 12.1663 5.8335 12.1663C5.65291 12.1663 5.47544 12.1188 5.3185 12.0285C3.16899 10.6712 0.833496 8.71741 0.833496 5.89094C0.833496 3.11836 3.12763 0.833008 5.8335 0.833008Z"
          // stroke="currentColor"
          strokeWidth="1.2"
        />
      </g>
      <path
        d="M9.8335 12.833C9.8335 13.5694 8.04264 14.1663 5.8335 14.1663C3.62436 14.1663 1.8335 13.5694 1.8335 12.833"
        // stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </g>
  </svg>
);

export default function LocationIcon(
  props: Partial<CustomIconComponentProps>
): ReactElement {
  return <Icon component={LocationSvg} {...props} />;
}
