import { isRightClick } from '@shared/utils';
import { Separator } from '@shared/widgets';
import AstalNotifd from 'gi://AstalNotifd';

import { getUrgency, playAudioFile } from '../helpers';
import { Actions } from './Actions';
import { Content } from './Content';
import { Header } from './Header';
export interface NotificationProps {
  notification: AstalNotifd.Notification;
}
export function Notification({ notification }: NotificationProps) {
  const { soundFile, soundName, suppressSound } = notification;

  if (!suppressSound) {
    void playAudioFile(soundFile);
    void playAudioFile(soundName);
  }

  return (
    <eventbox
      onClick={(_, event) => {
        if (isRightClick(event)) {
          notification.dismiss();
        }
      }}
    >
      <box
        vertical
        className={`container notification-card ${getUrgency(notification)}`}
      >
        <Header notification={notification} />
        <Separator />
        <Content notification={notification} />
        <Actions notification={notification} />
      </box>
    </eventbox>
  );
}
