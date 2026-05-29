import { styled } from "styled-components";
import type { NotifyType } from "./notification.constants.js";

const colorMap: Record<NotifyType, string> = {
  success: "#4caf50",
  error: "#f44336",
  info: "#2196f3",
  warning: "#ff9800",
};

export const StyledNotificationsContainer = styled.div`
  position: fixed;
  top: 16px;
  right: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 9999;
`;

export const StyledNotification = styled.div<{ $type: NotifyType }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-radius: 4px;
  background-color: ${({ $type }) => colorMap[$type]};
  color: white;
  font-size: 14px;
  min-width: 280px;
  max-width: 400px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

export const StyledNotificationMessage = styled.span`
  flex: 1;
`;

export const StyledNotificationClose = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
  padding: 0;
  line-height: 1;
`;

export const StyledSvg = styled.svg`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
`;
