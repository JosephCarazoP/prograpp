export type NotificationType = 'update' | 'observation' | 'reminder' | 'cheer' | 'assignment';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  targetType: 'all' | 'specific' | 'group';
  targetUid?: string;
  targetGroup?: string;
  sender: string;
  createdAt: number;
  readBy: string[];
  dismissedBy?: string[]; // UIDs de usuarios que limpiaron esta notificación de su bandeja personal
}

export interface NotificationTemplate {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  description: string;
}
