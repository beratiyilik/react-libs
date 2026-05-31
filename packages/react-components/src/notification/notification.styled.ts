import { styled } from "styled-components";
import type { NotifyType } from "./notification.constants.js";

export const StyledNotificationsContainer = styled.div`
  position: fixed;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  z-index: ${({ theme }) => theme.zIndex.notification};
`;

export const StyledNotification = styled.div<{ $type: NotifyType }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.radius.md};
  border-left: 3px solid
    ${({ theme, $type }) =>
      $type === "success"
        ? theme.colors.success
        : $type === "error"
          ? theme.colors.error
          : $type === "warning"
            ? theme.colors.warning
            : theme.colors.info};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.foreground};
  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.font.size.sm};
  min-width: 280px;
  max-width: 400px;
  box-shadow: ${({ theme }) => theme.shadow.md};
`;

export const StyledNotificationMessage = styled.span`
  flex: 1;
`;

export const StyledNotificationClose = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.mutedForeground};
  cursor: pointer;
  font-size: ${({ theme }) => theme.font.size.md};
  padding: 0;
  line-height: 1;
  &:hover {
    color: ${({ theme }) => theme.colors.foreground};
  }
`;

export const StyledSvg = styled.svg`
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
`;

export const StyledNotificationIcon = styled.span<{ $type: NotifyType }>`
  display: inline-flex;
  color: ${({ theme, $type }) =>
    $type === "success"
      ? theme.colors.success
      : $type === "error"
        ? theme.colors.error
        : $type === "warning"
          ? theme.colors.warning
          : theme.colors.info};
`;
