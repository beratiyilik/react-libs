"use client";
import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { Notifications } from "./notifications.component.js";
import { uuid } from "@beratiyilik/ts-utils";
import { NotifyTypes, NOTIFICATION_DISPLAY_DURATION } from "./notification.constants.js";
import type { NotifyType } from "./notification.constants.js";
import type { Notification, NotificationContextValue } from "./notification.types.js";

const NotificationContext = createContext<NotificationContextValue | null>(null);

export const useNotification = (): NotificationContextValue => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotification must be used within NotificationProvider");
  return context;
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const hide = (id: string) => setNotifications((current) => current.filter((n) => n.id !== id));

  const show = (
    message: ReactNode,
    type: NotifyType = NotifyTypes.INFO,
    duration: number = NOTIFICATION_DISPLAY_DURATION,
  ) => {
    const id = uuid();
    setNotifications((current) => [
      ...current,
      { id, message, type, duration, hide: () => hide(id) },
    ]);
    if (duration > 0) {
      setTimeout(() => hide(id), duration);
    }
  };

  const value = useMemo<NotificationContextValue>(
    () => ({
      show,
      hide,
      success: (message) => show(message, NotifyTypes.SUCCESS),
      error: (message) => show(message, NotifyTypes.ERROR),
      info: (message) => show(message, NotifyTypes.INFO),
      warning: (message) => show(message, NotifyTypes.WARNING),
    }),
    [],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <Notifications notifications={notifications} />
    </NotificationContext.Provider>
  );
};
