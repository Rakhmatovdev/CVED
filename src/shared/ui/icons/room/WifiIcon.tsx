import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import Icon from "@ant-design/icons/lib/components/Icon";
import type { ReactElement } from "react";

const wifiSvg = (): React.ReactElement => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.99967 10C11.4151 10 12.8973 10.4691 13.9223 11.4941C14.2477 11.8195 14.2477 12.3472 13.9223 12.6726C13.5968 12.998 13.0692 12.998 12.7438 12.6726C12.1021 12.0309 11.0843 11.6667 9.99967 11.6667C8.91509 11.6667 7.89728 12.0309 7.2556 12.6726C6.93016 12.998 6.40252 12.998 6.07708 12.6726C5.75165 12.3472 5.75165 11.8195 6.07708 11.4941C7.10207 10.4691 8.58426 10 9.99967 10Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.04987 8.94252C7.68262 5.91521 12.5049 5.89382 15.9689 8.95852C16.3136 9.26352 16.3458 9.79019 16.0408 10.1349C15.7359 10.4796 15.2092 10.5118 14.8645 10.2069C12.0492 7.71599 8.15076 7.6946 5.11684 10.2229C4.76328 10.5175 4.23781 10.4698 3.94317 10.1162C3.64853 9.7626 3.6963 9.2371 4.04987 8.94252Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.9997 2.91602C13.0788 2.916 16.1146 4.11862 18.8707 6.44589C19.2223 6.74282 19.2666 7.26859 18.9697 7.62023C18.6728 7.97187 18.147 8.01622 17.7954 7.71929C15.2883 5.60222 12.6223 4.58267 9.9997 4.58268C7.37707 4.58269 4.71113 5.60227 2.20401 7.71937C1.85238 8.01631 1.3266 7.97197 1.02967 7.62033C0.732731 7.2687 0.777074 6.74292 1.12871 6.44599C3.88476 4.11867 6.92056 2.91603 9.9997 2.91602Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.125 15C8.125 13.9645 8.9645 13.125 10 13.125C11.0355 13.125 11.875 13.9645 11.875 15C11.875 16.0355 11.0355 16.875 10 16.875C8.9645 16.875 8.125 16.0355 8.125 15Z"
      fill="currentColor"
    />
  </svg>
);

export default function WifiIcon(
  props: Partial<CustomIconComponentProps>
): ReactElement {
  return <Icon component={wifiSvg} {...props} />;
}
