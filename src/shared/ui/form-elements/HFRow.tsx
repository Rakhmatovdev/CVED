import { Flex } from "antd";
import { cn } from "@/shared/lib/utils";

function FRow({
  label,
  children,
  position = "vertical",
  required,
  className
}: {
  label: string;
  children: JSX.Element;
  position?: "vertical" | "horizontal";
  required?: boolean;
  className?: string;
}): JSX.Element {
  return (
    <Flex
      className="w-full"
      vertical={position === "vertical"}
      align={position === "horizontal" ? "center" : "start"}
    >
      <Flex
        className={cn(
          "text-mediumSlate transition 2xl:text-sm font-medium mb-1.5 line-clamp-1 text-xs dark:text-white",
          className
        )}
      >
        {required && <span className="!text-[#CE5A67]">*</span>} {label}{" "}
        {label == "" && <p className="text-transparent">1</p>}
      </Flex>
      <div className="component w-full ">{children}</div>
    </Flex>
  );
}

export default FRow;
// import React from 'react';
// import { Flex } from 'antd';
//
// interface FRowProps {
//   label: string;
//   required?: boolean;
//   error?: string;
//   children: React.ReactNode;
//   className?: string;
// }
//
// const FRow: React.FC<FRowProps> = ({
//                                      label,
//                                      required = false,
//                                      error,
//                                      children,
//                                      className = ""
//                                    }) => {
//   return (
//     <Flex vertical className={`w-full ${className}`}>
//       <div className="mb-2">
//         <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
//           {label}
//           {required && <span className="text-red-500 ml-1">*</span>}
//         </label>
//       </div>
//
//       <div className="w-full">
//         {children}
//       </div>
//
//       {error && (
//         <div className="mt-1 text-xs text-red-500">
//           {error}
//         </div>
//       )}
//     </Flex>
//   );
// };
//
// export default FRow;
