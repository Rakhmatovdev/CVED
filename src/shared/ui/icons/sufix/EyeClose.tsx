import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import Icon from "@ant-design/icons/lib/components/Icon";
import type { ReactElement } from "react";

// SVG komponent
const EyeCloseSvg = () => (
  <svg
    width="15"
    height="7"
    viewBox="0 0 15 7"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path
        d="M14.1666 0.833496C14.1666 0.833496 11.4999 4.8335 7.49992 4.8335C3.49992 4.8335 0.833252 0.833496 0.833252 0.833496"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M9.5 4.5L10.5 6.16667"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.8333 2.8335L14.1666 4.16683"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M0.833252 4.16699L2.16659 2.83366"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.5 4.5L4.5 6.16667"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

// React ikona komponenti
const EyeCloseIcon = (
  props: Partial<CustomIconComponentProps>
): ReactElement => {
  return <Icon component={EyeCloseSvg} {...props} />;
};

export default EyeCloseIcon;
