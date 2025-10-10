import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import Icon from "@ant-design/icons/lib/components/Icon";
import type { ReactElement } from "react";

const EyeSvg = () => (
  <svg
    width="15"
    height="11"
    viewBox="0 0 15 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.5 5.5C9.5 4.39543 8.60457 3.5 7.5 3.5C6.39543 3.5 5.5 4.39543 5.5 5.5C5.5 6.60457 6.39543 7.5 7.5 7.5C8.60457 7.5 9.5 6.60457 9.5 5.5Z"
      stroke="currentColor"
      strokeWidth="1.25"
    />
    <path
      d="M7.5 0.833658C11.1819 0.833658 14.1667 5.50033 14.1667 5.50033C14.1667 5.50033 11.1819 10.167 7.5 10.167C3.8181 10.167 0.833334 5.50033 0.833334 5.50033C0.833334 5.50033 3.8181 0.833658 7.5 0.833658Z"
      stroke="currentColor"
      strokeWidth="1.25"
    />
  </svg>
);

const EyeIcon = (props: Partial<CustomIconComponentProps>): ReactElement => {
  return <Icon component={EyeSvg} {...props} />;
};

export default EyeIcon;
