import * as React from "react";

type AvatarSize = "sm" | "md" | "lg" | "xl";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  size?: AvatarSize;
}

interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
}

interface AvatarFallbackProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  size?: AvatarSize;
}

const sizeClasses = {
  sm: "h-6 w-6 rounded-sm",
  md: "h-8 w-8 rounded-sm",
  lg: "h-10 w-10 rounded",
  xl: "h-12 w-12 rounded"
} as const;

const textSizes = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg"
} as const;

const ErrorImageIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      opacity="0.4"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.51973 1.72828C8.46459 1.52044 8.43699 1.41652 8.38313 1.37505C8.32926 1.33359 8.24273 1.33354 8.06966 1.33344C7.95393 1.33337 7.83633 1.33337 7.71666 1.33337H7.61739C6.16673 1.33336 5.01022 1.33335 4.10347 1.45525C3.16721 1.58113 2.39801 1.84787 1.78975 2.45613C1.18149 3.06439 0.914752 3.83359 0.788879 4.76985C0.666968 5.67659 0.666978 6.83304 0.666992 8.28371V8.38304C0.666978 9.83364 0.666968 10.9902 0.788879 11.8969C0.914752 12.8332 1.18149 13.6024 1.78975 14.2106C2.39801 14.8189 3.16721 15.0856 4.10347 15.2115C5.01023 15.3334 6.16672 15.3334 7.61739 15.3334H7.71659C9.16726 15.3334 10.3238 15.3334 11.2305 15.2115C12.1668 15.0856 12.936 14.8189 13.5443 14.2106C14.1525 13.6024 14.4193 12.8332 14.5451 11.8969C14.667 10.9901 14.667 9.83364 14.667 8.38297V8.28377C14.667 8.16444 14.667 8.04711 14.6669 7.93171C14.6669 7.75877 14.6668 7.67231 14.6253 7.61844C14.5839 7.56457 14.4801 7.53691 14.2725 7.48164C14.0203 7.41451 13.7819 7.28211 13.5841 7.08424L12.6178 6.11801C12.4845 5.98467 12.4178 5.91801 12.335 5.91801C12.2521 5.91801 12.1855 5.98467 12.0521 6.11801L11.0859 7.08424C10.4871 7.68311 9.51619 7.68311 8.91739 7.08424C8.31859 6.48547 8.31859 5.51461 8.91739 4.91581L9.88366 3.94955C10.017 3.81621 10.0837 3.74955 10.0837 3.66671C10.0837 3.58386 10.017 3.51719 9.88366 3.38386L8.91739 2.4176C8.71933 2.21955 8.58679 1.98081 8.51973 1.72828Z"
      fill="#777E90"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.4717 0.861886C10.2114 0.601539 9.78926 0.601539 9.52892 0.861886C9.26859 1.12224 9.26859 1.54435 9.52892 1.8047L11.3909 3.66663L9.52892 5.52855C9.26859 5.78891 9.26859 6.21101 9.52892 6.47137C9.78926 6.73169 10.2114 6.73169 10.4717 6.47137L12.3337 4.60943L14.1956 6.47137C14.4559 6.73169 14.8781 6.73169 15.1384 6.47137C15.3987 6.21101 15.3987 5.78891 15.1384 5.52855L13.2765 3.66663L15.1384 1.8047C15.3987 1.54435 15.3987 1.12224 15.1384 0.861886C14.8781 0.601539 14.4559 0.601539 14.1956 0.861886L12.3337 2.72382L10.4717 0.861886ZM4.12012 13.8661C4.17249 13.8745 4.22652 13.8824 4.2823 13.89C5.08988 13.9986 6.15653 14 7.66812 14C9.17979 14 10.2465 13.9986 11.054 13.89C11.8424 13.784 12.2833 13.587 12.6026 13.2677C12.9218 12.9485 13.1189 12.5076 13.2249 11.7192C13.2899 11.2351 13.3165 10.6579 13.3273 9.94763C12.3779 9.38896 11.5233 9.16643 10.7458 9.16663C9.85892 9.16683 9.02499 9.45689 8.21746 9.94876C6.78626 10.8206 5.52018 12.2668 4.27115 13.6936L4.12012 13.8661Z"
      fill="#777E90"
    />
  </svg>
);

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, children, size = "md", ...props }, ref) => {
    const sizeClass = sizeClasses[size] || sizeClasses.md;
    const fallbackContent = React.Children.toArray(children).find(
      (child) =>
        React.isValidElement(child) &&
        (child.type as any).displayName === "AvatarFallback"
    );

    const imageContent = React.Children.toArray(children).find(
      (child) =>
        React.isValidElement(child) &&
        (child.type as any).displayName === "AvatarImage"
    );

    const shouldShowFallback =
      !imageContent ||
      (React.isValidElement(imageContent) &&
        (!imageContent.props.src ||
          (imageContent.props as any).hasError === true));

    return (
      <div
        ref={ref}
        data-slot="avatar"
        className={`relative flex shrink-0 rounded-lg overflow-hidden ${sizeClass} ${className || ""}`}
        {...props}
      >
        {imageContent &&
          React.cloneElement(imageContent as React.ReactElement, {
            showFallbackOnError: false
          })}
        {shouldShowFallback &&
          fallbackContent &&
          React.cloneElement(fallbackContent as React.ReactElement, {
            size
          })}
        {shouldShowFallback && !fallbackContent && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg">
            <ErrorImageIcon />
          </div>
        )}
      </div>
    );
  }
);

const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, src, ...props }, ref) => {
    const [isLoading, setIsLoading] = React.useState(!!src);
    const [hasError, setHasError] = React.useState(false);

    React.useEffect(() => {
      if (src) {
        setIsLoading(true);
        setHasError(false);
      } else {
        setHasError(true);
        setIsLoading(false);
      }
    }, [src]);

    if (!src || hasError) {
      if (src === "") {
        return null;
      }

      return (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg">
          <ErrorImageIcon />
        </div>
      );
    }

    return (
      <>
        <img
          ref={ref}
          data-slot="avatar-image"
          className={`aspect-square h-full w-full object-cover rounded-lg transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          } ${className || ""}`}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          src={src}
          {...props}
        />
        {isLoading && !hasError && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg" />
        )}
      </>
    );
  }
);

const AvatarFallback = React.forwardRef<HTMLDivElement, AvatarFallbackProps>(
  ({ className, children, size = "md", ...props }, ref) => {
    const textSize = textSizes[size] || textSizes.md;
    return (
      <div
        ref={ref}
        data-slot="avatar-fallback"
        className={`bg-muted flex h-full w-full items-center bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 justify-center rounded-lg ${textSize} ${className || ""}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";
AvatarImage.displayName = "AvatarImage";
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
