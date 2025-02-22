import { notifdService } from '@shared/globals';
import { CenterTopPopup } from '@shared/widgets/CenterTopPopup';
import { bind, timeout } from 'astal';

import { Notification } from '../notification/Notification';
import { NotificationPanelHeader } from './Header';
import { Placeholder } from './Placeholder';

export function NotificationPanel() {
  const notifications = bind(notifdService, 'notifications').as(
    (notifications) =>
      notifications
        .sort((a, b) => b.time - a.time)
        .map((notification) => (
          <Notification
            notification={notification}
            playSound={false}
            inNotificationPanel={true}
          />
        )),
  );

  const clearNotifications = () => {
    if (notifdService.notifications.length === 0) return;

    notifdService.notifications.pop()?.dismiss();
    timeout(15, clearNotifications);
  };

  const toggleDND = () => {
    notifdService.set_dont_disturb(!notifdService.get_dont_disturb());
  };

  return (
    <CenterTopPopup name={'notification-panel'}>
      <box widthRequest={400} vertical className="notification-panel">
        <NotificationPanelHeader
          onDNDClick={toggleDND}
          onDeleteClick={clearNotifications}
        />

        {bind(notifications).as((notifications) => {
          if (notifications.length === 0) {
            return <Placeholder />;
          }

          return (
            <scrollable vexpand>
              <box vertical>{notifications}</box>
            </scrollable>
          );
        })}
      </box>
    </CenterTopPopup>
  );
}
