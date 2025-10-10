import { message } from "antd";
import { ReactNode } from "react";

export type MessageType = "success" | "error" | "warning" | "info" | "loading";

interface MessageOptions {
  content: ReactNode;
  duration?: number;
  key?: string;
}

export const useMessageApi = () => {
  const showMessage = (type: MessageType, options: MessageOptions) => {
    message.open({
      type,
      content: options.content,
      duration: options.duration ?? 3,
      key: options.key
    });
  };

  return {
    warning: (options: MessageOptions) => showMessage("warning", options)
  };
};
