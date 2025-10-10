import React, { useState } from "react";
import { cn } from "../lib/utils";

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
  className?: string;
  objectFit?: string;
  fallbackSrc?: string;
  width?: string | number;
  height?: string | number;
};

const Image: React.FC<Props> = ({
  src,
  alt,
  className = "",
  objectFit = "cover",
  fallbackSrc,
  width = "40px",
  height = "40px",
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div
      className={cn(`relative overflow-hidden rounded-lg`, className)}
      style={{ width: width, height: height }}
    >
      {!loaded && !error && (
        <div className="absolute inset-0 animate-pulse bg-gray-200" />
      )}

      {!error ? (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          width={width}
          height={height}
          className={cn(
            "w-full h-full transition-opacity duration-300",
            objectFit ? "object-cover" : "object-contain",
            loaded ? "opacity-100" : "opacity-0"
          )}
          {...props}
        />
      ) : fallbackSrc ? (
        <img
          src={fallbackSrc}
          alt={alt}
          width={width}
          height={height}
          className={cn(
            "w-full h-full transition-opacity duration-300",
            objectFit,
            loaded ? "opacity-100" : "opacity-0"
          )}
          {...props}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
          Failed to load
        </div>
      )}
    </div>
  );
};

export default Image;
