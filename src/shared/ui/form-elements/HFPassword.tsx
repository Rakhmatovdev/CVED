// import { Input, Typography } from "antd";
// import { Controller } from "react-hook-form";
//
// function HFPassword({
//   control,
//   name = "",
//   disabledHelperText = false,
//   required = false,
//   rules = {},
//   ...props
// }: any) {
//   return (
//     <Controller
//       control={control}
//       name={name}
//       defaultValue=""
//       rules={{
//         required: required ? "Это объязательная поля!" : false,
//         ...rules
//       }}
//       render={({ field: { onChange, value }, fieldState: { error } }) => (
//         <>
//           <Input.Password
//             value={value}
//             className="border border-[#E5E7EB] rounded-lg h-[40px] w-full px-[10px] text-[#1E1E1E] text-sm font-normal shadow-sm dark:border-[#3A405A] dark:bg-[#2B3048] dark:text-[#B7BFD5] placeholder:!text-[#FFFFFF] "
//             onChange={(e) => {
//               onChange(e.target.value);
//             }}
//             name={name}
//             error={error}
//             status={error ? "error" : "success"}
//             helperText={!disabledHelperText && (error?.message ?? " ")}
//             {...props}
//           />
//           {error && !disabledHelperText && (
//             <Typography.Text type="danger">{error.message}</Typography.Text>
//           )}
//         </>
//       )}
//     />
//   );
// }
//
// export default HFPassword;
import { Input, Typography } from "antd";
import React from "react";
import { Controller } from "react-hook-form";

interface HFPasswordProps {
  control: any;
  name: string;
  disabledHelperText?: boolean;
  required?: boolean;
  rules?: Record<string, any>;
  [key: string]: any;
}

const HFPassword: React.FC<HFPasswordProps> = ({
  control,
  name = "",
  disabledHelperText = false,
  required = false,
  rules = {},
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      rules={{
        required: required ? "Это объязательная поля!" : false,
        ...rules
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className="w-full">
          <Input.Password
            {...props}
            value={value}
            className={`border rounded-xl h-[40px] w-full px-[10px] text-sm font-normal shadow-sm ${
              error
                ? "border-[#ff4d4f]"
                : "border-[#E5E7EB] dark:border-[#3A405A]"
            } text-[#1E1E1E] dark:bg-[#2B3048] dark:text-[#B7BFD5] dark:placeholder-[#FFFFFF]`}
            onChange={onChange}
            status={error ? "error" : undefined}
          />
          {error && !disabledHelperText && (
            <Typography.Text type="danger" className="mt-1 block">
              {error.message}
            </Typography.Text>
          )}
        </div>
      )}
    />
  );
};

export default HFPassword;
