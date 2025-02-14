import { App, Astal, Gdk, Gtk } from 'astal/gtk3';

import { CenterModule } from './CenterModule';
import { LeftModule } from './LeftModule';
import { RightModule } from './RightModule';

const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;

export default function Bar(gdkMonitor: Gdk.Monitor) {
  return (
    <window
      className="Bar"
      gdkmonitor={gdkMonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      application={App}
    >
      <centerbox className="BarContainer" heightRequest={48}>
        <box hexpand halign={Gtk.Align.START} className="left-module module">
          <LeftModule />
        </box>

        <box halign={Gtk.Align.CENTER} className="center-module module">
          <CenterModule monitor={gdkMonitor} />
        </box>

        <box hexpand halign={Gtk.Align.END} className="right-module module">
          <RightModule />
        </box>
      </centerbox>
    </window>
  );
}
