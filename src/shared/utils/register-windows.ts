import { Gtk } from 'astal/gtk3';

type Window = () => Gtk.Widget;

export function registerWindows(windows: Window[] | Window) {
  windows = Array.isArray(windows) ? windows : [windows];

  for (const window of windows) {
    window();
  }
}
