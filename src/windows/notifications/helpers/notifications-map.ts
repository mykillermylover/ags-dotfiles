import { notifdService } from '@shared/globals';
import { VarMap } from '@subscribables/var-map';
import { AstalIO, interval, timeout, Variable } from 'astal';
import { Subscribable } from 'astal/binding';
import { Window } from 'astal/gtk3/widget';
import AstalNotifd from 'gi://AstalNotifd';

import { Notification } from '../notification/Notification';
import { NotificationWidget } from './notification-widget.type';

const TIMEOUT = 7000;

interface NotificationsMapProps {
  isPanel?: boolean;
  window?: Variable<Window | undefined>;
}

export class NotificationsMap implements Subscribable {
  #notifications: VarMap<number, NotificationWidget>;
  #timeouts = new VarMap<number, AstalIO.Time>();

  private readonly isPanel: boolean;
  private window?: Variable<Window | undefined>;

  constructor(props?: NotificationsMapProps) {
    const { isPanel = false, window } = props ?? {};

    this.isPanel = isPanel;
    this.window = window;

    const initialValue: [number, NotificationWidget][] = isPanel
      ? notifdService.notifications.map((notification) => [
          notification.id,
          this.createWidget(notification),
        ])
      : [];

    this.#notifications = new VarMap(initialValue);

    notifdService.connect('notified', this.addNotification);
    notifdService.connect('resolved', this.deleteNotification);
  }

  private createWidget(notification: AstalNotifd.Notification) {
    const [playSound, inNotificationPanel] = this.isPanel
      ? [false, true]
      : [true, false];

    return Notification({
      notification,
      playSound,
      inNotificationPanel,
    });
  }

  private addNotification = (_: unknown, id: number) => {
    const notification = this.getNotification(id);
    if (
      !this.isPanel &&
      notifdService.dontDisturb &&
      notification.urgency !== AstalNotifd.Urgency.CRITICAL
    ) {
      return;
    }

    this.window?.get()?.set_visible(true);

    const widget = this.createWidget(notification);
    this.#notifications.set(id, widget);

    if (!this.isPanel) {
      this.#timeouts.set(
        id,
        timeout(TIMEOUT, () => this.deleteNotification(_, id)),
      );
    }
  };

  private deleteNotification = async (_: unknown, id: number) => {
    if (this.#notifications.size === 1) {
      this.window?.get()?.set_visible(false);
    }

    const widget = this.getItem(id);
    if (!widget) {
      return;
    }

    await widget.hideSelf();
    widget.destroy();
    this.#notifications.delete(id);

    this.#timeouts.getItem(id)?.cancel();
    this.#timeouts.delete(id);
  };

  private getNotification(id: number) {
    return notifdService.get_notification(id);
  }

  clearNotifications = () => {
    const nList = this.#notifications.getMap();
    if (nList.length === 0) return;

    const sub = interval(15, () => {
      if (nList.length === 0) {
        sub.cancel();
        return;
      }

      const item = nList.pop();
      if (!item) {
        sub.cancel();
        return;
      }

      this.getNotification(item[0]).dismiss();
    });
  };

  get() {
    // it's reversing array in-place, but here it works well
    return this.#notifications.get().reverse();
  }

  getItem(id: number) {
    return this.#notifications.getItem(id);
  }

  subscribe(callback: (value: NotificationWidget[]) => void): () => void {
    return this.#notifications.subscribe(callback);
  }
}
