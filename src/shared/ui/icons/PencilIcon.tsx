import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import Icon from "@ant-design/icons/lib/components/Icon";
import type { ReactElement } from "react";

const PencilSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M14.1216 2.64356C14.611 2.15417 14.8557 1.90948 15.1268 1.79246C15.5173 1.62387 15.9601 1.62387 16.3507 1.79246C16.6217 1.90948 16.8664 2.15417 17.3558 2.64356C17.8452 3.13295 18.0899 3.37764 18.2069 3.64873C18.3755 4.03927 18.3755 4.48205 18.2069 4.87259C18.0899 5.14368 17.8452 5.38837 17.3558 5.87776L13.1712 10.0624C12.1402 11.0934 11.6247 11.6089 10.979 11.9144C10.3333 12.2198 9.60783 12.2914 8.15686 12.4345L7.5 12.4994L7.56482 11.8425C7.70798 10.3915 7.77958 9.66602 8.08501 9.02035C8.39042 8.37469 8.90592 7.85921 9.93692 6.82822L14.1216 2.64356Z"
      stroke="#6B7280"
      stroke-width="1.25"
      stroke-linejoin="round"
    />
    <path
      d="M5.0013 12.5H3.1263C2.32089 12.5 1.66797 13.1529 1.66797 13.9583C1.66797 14.7638 2.32089 15.4167 3.1263 15.4167H11.043C11.8484 15.4167 12.5013 16.0696 12.5013 16.875C12.5013 17.6804 11.8484 18.3333 11.043 18.3333H9.16797"
      stroke="#6B7280"
      stroke-width="1.25"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default function PencilIcon(
  props: Partial<CustomIconComponentProps>
): ReactElement {
  return <Icon component={PencilSvg} {...props} />;
}
