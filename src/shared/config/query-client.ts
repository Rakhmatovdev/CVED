import { MutationCache, QueryClient } from "@tanstack/react-query";
import { notify } from "@/shared/lib/notification.ts";

type IQueryInvalidateValue = "roles" | string;

type IQueryInvalidateType =
  | IQueryInvalidateValue
  | Readonly<IQueryInvalidateValue>
  | IQueryInvalidateValue[]
  | Readonly<IQueryInvalidateValue[]>;

interface INotificationPayload {
  message: string;
  description?: string;
  type?: "success" | "error" | "info" | "warning";
}

declare module "@tanstack/react-query" {
  interface Register {
    mutationMeta: {
      invalidate?: IQueryInvalidateType;
      successNotification?: (
        data: any,
        variables: any,
        context: any
      ) => INotificationPayload;
      errorNotification?: (
        error: any,
        variables: any,
        context: any
      ) => INotificationPayload;
      [key: string]: unknown;
    };
  }
}

const mutationCache = new MutationCache({
  onError: (error, variables, context, mutation) => {
    const meta = mutation?.meta;

    // Notification
    // On Error
    if (typeof meta?.errorNotification === "function") {
      const notif = meta.errorNotification(error, variables, context);
      const notifType = notif.type || "error";
      notify[notifType]({
        message: notif.message,
        description: notif.description
      });
    }
  },
  onSuccess: (data, variables, context, mutation) => {
    const meta = mutation?.meta;

    // Invalidation
    const invalidations = meta?.invalidate;
    if (Array.isArray(invalidations)) {
      for (const key of invalidations) {
        queryClient.invalidateQueries({
          queryKey: Array.isArray(key) ? key : [key]
        });
      }
    }

    // Notification
    if (typeof meta?.successNotification === "function") {
      const notif = meta.successNotification(data, variables, context);
      const notifType = notif.type || "success";
      notify[notifType]({
        message: notif.message,
        description: notif.description
      });
    }
  }
});

const queryClient = new QueryClient({
  mutationCache,
  defaultOptions: {
    queries: {
      staleTime: 5000,
      refetchOnWindowFocus: false,
      retry: false
    }
  }
});

export default queryClient;
