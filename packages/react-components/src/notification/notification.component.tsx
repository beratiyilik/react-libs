"use client";
import type { Notification } from "./notification.types.js";
import { NotifyTypes } from "./notification.constants.js";
import {
  StyledNotification,
  StyledNotificationIcon,
  StyledNotificationMessage,
  StyledNotificationClose,
} from "./notification.styled.js";
import { ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from "./icons/index.js";

const iconMap = {
  [NotifyTypes.SUCCESS]: SuccessIcon,
  [NotifyTypes.ERROR]: ErrorIcon,
  [NotifyTypes.INFO]: InfoIcon,
  [NotifyTypes.WARNING]: WarningIcon,
};

export const NotificationItem = ({ message, type, hide }: Notification) => {
  const Icon = iconMap[type];
  return (
    <StyledNotification $type={type}>
      <StyledNotificationIcon $type={type}>
        <Icon />
      </StyledNotificationIcon>
      <StyledNotificationMessage>{message}</StyledNotificationMessage>
      <StyledNotificationClose onClick={hide}>✕</StyledNotificationClose>
    </StyledNotification>
  );
};
