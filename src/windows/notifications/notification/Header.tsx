import { Gtk } from 'astal/gtk3';

import { getTime, processAppIcon } from '../helpers';
import { NotificationProps } from './Notification';

export function Header({ notification }: NotificationProps) {
  const {
    appIcon,
    desktopEntry,
    appName,
    time: notificationTime,
  } = notification;
  const { START, END } = Gtk.Align;

  const icon = processAppIcon(appIcon || desktopEntry);

  return (
    <box hexpand className="header">
      {icon && <icon className="app-icon" icon={icon} />}
      <label
        className="app-name"
        halign={START}
        truncate
        label={appName || 'Unknown'}
      />
      <label
        className="time"
        hexpand
        halign={END}
        label={getTime(notificationTime)}
      />
      <button cursor="pointer" onClicked={() => notification.dismiss()}>
        <icon icon="window-close-symbolic" />
      </button>
    </box>
  );
}
