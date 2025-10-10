import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import Icon from "@ant-design/icons/lib/components/Icon";
import type { ReactElement } from "react";

const DeleteSvg = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.1667 7.5L9.16667 12.5M9.16667 7.5L14.1667 12.5M2.26667 10.8L5.86667 15.6C6.16 15.9911 6.30667 16.1867 6.49254 16.3277C6.65717 16.4526 6.8436 16.5458 7.04231 16.6026C7.26667 16.6667 7.51111 16.6667 8 16.6667H14.3333C15.7335 16.6667 16.4335 16.6667 16.9683 16.3942C17.4387 16.1545 17.8212 15.7721 18.0609 15.3016C18.3333 14.7669 18.3333 14.0668 18.3333 12.6667V7.33334C18.3333 5.9332 18.3333 5.23314 18.0609 4.69836C17.8212 4.22795 17.4387 3.8455 16.9683 3.60582C16.4335 3.33334 15.7335 3.33334 14.3333 3.33334H8C7.51111 3.33334 7.26667 3.33334 7.04231 3.39741C6.8436 3.45416 6.65717 3.54738 6.49254 3.6723C6.30667 3.81334 6.16 4.00889 5.86667 4.4L2.26667 9.2C2.05151 9.48688 1.94392 9.63033 1.90245 9.78786C1.86585 9.92692 1.86585 10.0731 1.90245 10.2121C1.94392 10.3697 2.05151 10.5131 2.26667 10.8Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function DeleteIcon(
  props: Partial<CustomIconComponentProps>
): ReactElement {
  return <Icon component={DeleteSvg} {...props} />;
}
