"use client";
import type { Notification } from "./Notification.types.js";
import { StyledNotificationsContainer } from "./Notification.styles.js";
import { NotificationItem } from "./Notification.js";

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
