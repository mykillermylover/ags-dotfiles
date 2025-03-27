import { closePopup, notifdService } from '@shared/globals';
import { AnchoredPopup } from '@shared/widgets/popups/anchored-popup';
import { CHILD_POSITION } from '@shared/widgets/popups/anchored-popup/interfaces';
import { bind } from 'astal';

import { NotificationsMap } from '../helpers/notifications-map';
import { NotificationPanelHeader } from './Header';
import { Placeholder } from './Placeholder';

const WINDOW_NAME = 'notification-panel';

export function NotificationPanel() {
  const notifications = new NotificationsMap({ isPanel: true });

  const haveNotifications = bind(notifications).as((list) => list.length > 0);

  const toggleDND = () => {
    notifdService.set_dont_disturb(!notifdService.get_dont_disturb());
  };

  const handleDeleteClick = () => {
    const interval = notifications.clearNotifications();

    interval.connect('cancelled', () => closePopup(WINDOW_NAME));
  };

  return (
    <AnchoredPopup position={CHILD_POSITION.TOP_CENTER} name={WINDOW_NAME}>
      <box widthRequest={400} vertical className="notification-panel">
        <NotificationPanelHeader
          onDNDClick={toggleDND}
          onDeleteClick={handleDeleteClick}
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
    </AnchoredPopup>
  );
}
