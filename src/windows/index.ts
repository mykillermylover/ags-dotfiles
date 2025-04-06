import { BarPopups } from '@windows/bar/popups';
import { NotificationPanel, NotificationsPopups } from '@windows/notifications';
import { OSD } from '@windows/osd';
import { PowerMenu } from '@windows/power-menu';

export const WINDOWS = [
  ...BarPopups,
  NotificationsPopups,
  NotificationPanel,
  OSD,
  PowerMenu,
];
