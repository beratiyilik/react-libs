"use client";
import type { Notification } from "./notification.types.js";
import { StyledNotificationsContainer } from "./notification.styles.js";
import { NotificationItem } from "./notification.js";

type NotificationsProps = {
  notifications: Notification[];
};

export const Notifications = ({ notifications }: NotificationsProps) => (
  <StyledNotificationsContainer aria-live="polite" aria-atomic="false">
    {notifications.map((notification) => (
      <NotificationItem key={notification.id} {...notification} />
    ))}
  </StyledNotificationsContainer>
);
