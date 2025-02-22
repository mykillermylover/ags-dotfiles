import { isRightClick } from '@shared/utils';
import { Separator } from '@shared/widgets';
import AstalNotifd from 'gi://AstalNotifd';

import { getUrgency, playAudioFile } from '../helpers';
import { Actions } from './Actions';
import { Content } from './Content';
import { Header } from './Header';
export interface NotificationProps {
  notification: AstalNotifd.Notification;
  playSound?: boolean;
  inNotificationPanel?: boolean;
}
export function Notification({
  notification,
  playSound = true,
  inNotificationPanel = false,
}: NotificationProps) {
  const { soundFile, soundName, suppressSound } = notification;

  if (!suppressSound && playSound) {
    void playAudioFile(soundFile);
    void playAudioFile(soundName);
  }

  let className = `notification-card ${getUrgency(notification)} `;

  className += inNotificationPanel ? 'panel-notification' : 'container';

  return (
    <eventbox
      onClick={(_, event) => {
        if (isRightClick(event)) {
          notification.dismiss();
        }
      }}
    >
      <box vertical className={className}>
        <Header notification={notification} />
        <Separator />
        <Content notification={notification} />
        <Actions
          notification={notification}
          inNotificationPanel={inNotificationPanel}
        />
      </box>
    </eventbox>
  );
}
