import { delay, isRightClick } from '@shared/utils';
import { Separator } from '@shared/widgets';
import { Variable } from 'astal';
import { Revealer } from 'astal/gtk3/widget';
import AstalNotifd from 'gi://AstalNotifd';

import { NotificationWidget } from '../helpers';
import { getUrgency, playAudioFile } from '../helpers';
import { Actions } from './Actions';
import { Content } from './Content';
import { Header } from './Header';

export interface NotificationProps {
  notification: AstalNotifd.Notification;
  playSound?: boolean;
  inNotificationPanel?: boolean;
}

const TRANSITION_DURATION = 100;

export function Notification({
  notification,
  playSound = true,
  inNotificationPanel = false,
}: NotificationProps): NotificationWidget {
  const { soundFile, soundName, suppressSound } = notification;

  const visible = Variable(true);

  let className = `notification-card ${getUrgency(notification)} `;
  className += inNotificationPanel ? 'panel-notification' : 'container';

  const hideSelf = () => {
    visible.set(false);
    return delay(TRANSITION_DURATION);
  };

  if (!suppressSound && playSound) {
    void playAudioFile(soundFile);
    void playAudioFile(soundName);
  }

  const widget = new Revealer({
    revealChild: visible(),
    onDestroy: () => {
      visible.drop();
    },
    transitionDuration: TRANSITION_DURATION,
    child: (
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
    ),
  });

  return Object.assign(widget, { hideSelf });
}
