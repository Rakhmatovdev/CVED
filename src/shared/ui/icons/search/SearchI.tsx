import React from "react";

export interface SearchIconProps {
  size?: number | string;
  strokeColor?: string;
  strokeWidth?: number;
  className?: string;
}

const SearchI: React.FC<SearchIconProps> = ({
  size = 21,
  strokeWidth = 1.5,
  className = "",
  strokeColor = "#6B7280"
}) => (
  <svg
    width={size}
    height={typeof size === "number" ? size * (20 / 21) : undefined}
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke={strokeColor}
  >
    <path
      d="M15.083 14.5834L18.833 18.3334"
      // stroke={'currentColor'}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.167 9.16663C17.167 5.02449 13.8092 1.66663 9.66699 1.66663C5.52486 1.66663 2.16699 5.02449 2.16699 9.16663C2.16699 13.3088 5.52486 16.6666 9.66699 16.6666C13.8092 16.6666 17.167 13.3088 17.167 9.16663Z"
      // stroke={'currentColor'}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
  </svg>
);

export default SearchI;
