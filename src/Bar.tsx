import { CenterModule } from '@bar/modules/center/CenterModule';
import { LeftModule } from '@bar/modules/left/LeftModule';
import { RightModule } from '@bar/modules/right/RightModule';
import { App, Astal, Gdk, Gtk } from 'astal/gtk3';

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
      <centerbox className="BarContainer">
        <box hexpand halign={Gtk.Align.START} className="LeftModule Module">
          <LeftModule />
        </box>

        <box halign={Gtk.Align.CENTER} className="CenterModule Module">
          <CenterModule monitor={gdkMonitor} />
        </box>

        <box hexpand halign={Gtk.Align.END} className="RightModule Module">
          <RightModule />
        </box>
      </centerbox>
    </window>
  );
}
