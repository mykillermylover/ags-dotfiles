import { Gtk } from 'astal/gtk3';

interface NotificationMethods {
  hideSelf: () => Promise<void>;
}
export type NotificationWidget = Gtk.Widget & NotificationMethods;
