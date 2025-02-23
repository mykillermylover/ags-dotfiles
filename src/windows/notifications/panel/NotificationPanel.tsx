import { notifdService } from '@shared/globals';
import { CenterTopPopup } from '@shared/widgets/CenterTopPopup';
import { bind } from 'astal';

import { NotificationsMap } from '../helpers/notifications-map';
import { NotificationPanelHeader } from './Header';
import { Placeholder } from './Placeholder';

export function NotificationPanel() {
  const notifications = new NotificationsMap({ isPanel: true });

  const haveNotifications = bind(notifications).as((list) => list.length > 0);

  const toggleDND = () => {
    notifdService.set_dont_disturb(!notifdService.get_dont_disturb());
  };

  return (
    <CenterTopPopup name={'notification-panel'}>
      <box widthRequest={400} vertical className="notification-panel">
        <NotificationPanelHeader
          onDNDClick={toggleDND}
          onDeleteClick={notifications.clearNotifications}
        />

        <Placeholder visible={haveNotifications.as((v) => !v)} />

        <scrollable vexpand visible={haveNotifications}>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
          /* @ts-expect-error*/}
          <box vertical noImplicitDestroy>
            {bind(notifications)}
          </box>
        </scrollable>
      </box>
    </CenterTopPopup>
  );
}
