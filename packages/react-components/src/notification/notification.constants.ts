export const NOTIFICATION_DISPLAY_DURATION = 3000;

export const NotifyTypes = {
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
  WARNING: "warning",
} as const;

export type NotifyType = (typeof NotifyTypes)[keyof typeof NotifyTypes];