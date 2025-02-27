import { BarPopups } from '@windows/bar/popups';
import { NotificationPanel, NotificationsPopups } from '@windows/notifications';
import { OSD } from '@windows/osd';

export const WINDOWS = [
  ...BarPopups,
  NotificationsPopups,
  NotificationPanel,
  OSD,
];
