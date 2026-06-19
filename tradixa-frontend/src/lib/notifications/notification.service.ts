import type { AppNotification } from "./notification.types";

const notifications: AppNotification[] = [];

export function createNotification(notification: AppNotification): AppNotification {
  notifications.push(notification);
  return notification;
}

export function getNotifications(): AppNotification[] {
  return notifications;
}

export function markNotificationAsRead(notificationId: string, readAt: string): void {
  const notification = notifications.find((item) => item.id === notificationId);
  if (notification) {
    notification.readAt = readAt;
  }
}
