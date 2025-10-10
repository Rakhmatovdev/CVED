import type { NotificationInstance } from "antd/es/notification/interface";

let notifyRef: NotificationInstance | null = null;

export const setNotificationApi = (api: NotificationInstance) => {
  notifyRef = api;
};

export const notify = new Proxy(
  {},
  {
    get(_, prop: string) {
      if (!notifyRef) {
        throw new Error(
          `Notification API not initialized. Make sure AntdProvider is mounted before calling notify.${prop}()`
        );
      }
      return (notifyRef as any)[prop];
    }
  }
) as NotificationInstance;
