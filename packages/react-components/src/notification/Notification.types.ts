import type { ReactNode } from "react";
import type { NotifyType } from "./Notification.constants.js";

export type Notification = {
  id: string;
  message: ReactNode;
  type: NotifyType;
  duration: number;
  hide: () => void;
};

export type NotificationContextValue = {
  show: (message: ReactNode, type?: NotifyType, duration?: number) => void;
  hide: (id: string) => void;
  success: (message: ReactNode) => void;
  error: (message: ReactNode) => void;
  info: (message: ReactNode) => void;
  warning: (message: ReactNode) => void;
};
