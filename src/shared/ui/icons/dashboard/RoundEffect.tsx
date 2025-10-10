import React from "react";

interface SVGIconProps extends React.SVGProps<SVGSVGElement> {
  fillColor?: string;
  width?: string | number;
  height?: string | number;
}

const RoundEffectIcon: React.FC<SVGIconProps> = ({
  fillColor = "#3276FF",
  ...rest
}) => {
  return (
    <svg
      width="222"
      height="178"
      viewBox="0 0 222 178"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <g filter="url(#filter0_f_9187_9489)">
        <circle cy="-2" r="50" fill={fillColor} fill-opacity="0.7" />
      </g>
      <defs>
        <filter
          id="filter0_f_9187_9489"
          x="-222"
          y="-224"
          width="444"
          height="444"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="86"
            result="effect1_foregroundBlur_9187_9489"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default RoundEffectIcon;
