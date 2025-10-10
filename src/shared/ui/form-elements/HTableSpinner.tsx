import { Spin } from "antd";

interface IProps {
  show?: boolean;
}

export function HTableSpinner({ show }: IProps) {
  if (!show) return null;

  return (
    <div
      className={
        "absolute inset-0 z-20 flex justify-center items-center h-full w-full backdrop-blur-[3px]"
      }
    >
      <Spin />
    </div>
  );
}
