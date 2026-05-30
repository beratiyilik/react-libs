"use client";
import type { Notification } from "./notification.types.js";
import { StyledNotificationsContainer } from "./notification.styled.js";
import { NotificationItem } from "./notification.component.js";

type NotificationsProps = {
  notifications: Notification[];
};

export const Notifications = ({ notifications }: NotificationsProps) => (
  <StyledNotificationsContainer>
    {notifications.map((notification) => (
      <NotificationItem key={notification.id} {...notification} />
    ))}
  </StyledNotificationsContainer>
);
