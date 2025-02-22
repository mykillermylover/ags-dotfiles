import { notifdService } from '@shared/globals';
import { icons } from '@shared/icons';
import { openPopup } from '@shared/utils';
import { bind, Variable } from 'astal';

export function Notifications() {
  const className = Variable.derive(
    [bind(notifdService, 'dontDisturb'), bind(notifdService, 'notifications')],
    (dnd, notifications) => {
      if (dnd) {
        return 'silent';
      }

      if (notifications.length > 0) {
        return 'message';
      }

      return 'noisy';
    },
  );

  const icon = className((name) => icons.notifications[name]);

  const tooltip = bind(notifdService, 'notifications').as((notifications) => {
    if (notifications.length > 0) {
      return `You have ${notifications.length} notifications`;
    }

    return 'No notifications';
  });

  return (
    <eventbox
      cursor="pointer"
      onClick={(self) => openPopup(self, 'notification-panel')}
    >
      <box>
        <icon
          tooltipMarkup={tooltip}
          className={className(
            (name) => `${name} notification-button module-item`,
          )}
          icon={icon}
        />
      </box>
    </eventbox>
  );
}
