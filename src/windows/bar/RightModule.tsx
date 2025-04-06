import { Battery } from '@windows/bar/widgets/battery';
import { ModuleSeparator } from '@windows/bar/widgets/ModuleSeparator';
import { AudioControl } from '@windows/bar/widgets/sound';
import { SystemTray } from '@windows/bar/widgets/sys-tray';
import { Gtk } from 'astal/gtk3';
import { PowerMenu } from 'windows/bar/widgets/power-menu-button';

export function RightModule() {
  return (
    <box
      hexpand
      halign={Gtk.Align.END}
      className="container right-module module"
    >
      <SystemTray />
      <ModuleSeparator />

      <AudioControl />

      <Battery />

      <ModuleSeparator />
      <PowerMenu />
    </box>
  );
}
