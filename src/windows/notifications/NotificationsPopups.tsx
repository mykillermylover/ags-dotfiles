import { hyprlandService, notifdService } from '@shared/globals';
import { VarMap } from '@subscribables/var-map';
import { bind, timeout } from 'astal';
import { Astal, Gtk } from 'astal/gtk3';
import { Window } from 'astal/gtk3/widget';
import AstalNotifd from 'gi://AstalNotifd';

import { Notification } from './notification/Notification';

const { TOP, RIGHT } = Astal.WindowAnchor;
const TIMEOUT = 7000;

export function NotificationsPopups() {
  const monitor = bind(hyprlandService, 'focusedMonitor').as(({ id }) => id);

  const notifications = new VarMap<number, Gtk.Widget>();

  const setup = (self: Window) => {
    self.hook(notifdService, 'notified', (_, id: number) => {
      const notification = notifdService.get_notification(id);

      if (
        notifdService.dontDisturb &&
        notification.urgency != AstalNotifd.Urgency.CRITICAL
      ) {
        return;
      }

      notifications.set(id, Notification({ notification }));

      timeout(TIMEOUT, () => notifications.delete(id));
    });
    self.hook(notifdService, 'resolved', (_, id: number) => {
      notifications.delete(id);
    });
  };

  return (
    <window
      widthRequest={400}
      name="notification-popup"
      namespace="notification-popup"
      layer={Astal.Layer.OVERLAY}
      anchor={RIGHT | TOP}
      exclusivity={Astal.Exclusivity.NORMAL}
      monitor={monitor}
      setup={setup}
    >
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
      /* @ts-expect-error*/}
      <box vertical noImplicitDestroy>
        {bind(notifications)}
      </box>
    </window>
  );
}
