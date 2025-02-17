import { Battery } from '@bar/widgets/battery/Battery';
import { ModuleSeparator } from '@bar/widgets/ModuleSeparator';
import { PowerMenu } from '@bar/widgets/PowerMenu';
import { AudioControl } from '@bar/widgets/sound/AudioControl';
import { SystemTray } from '@bar/widgets/sys-tray/SystemTray';
import { Gtk } from 'astal/gtk3';

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
