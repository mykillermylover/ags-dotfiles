import { Gtk } from 'astal/gtk3';

export function registerWindows(windows: (() => Gtk.Widget)[]) {
  for (const window of windows) {
    window();
  }
}
