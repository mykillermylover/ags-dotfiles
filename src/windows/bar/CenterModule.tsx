import { Clock } from '@windows/bar/widgets/clock';
import { Media } from '@windows/bar/widgets/media-button';
import { ModuleSeparator } from '@windows/bar/widgets/ModuleSeparator';
import { Notifications } from '@windows/bar/widgets/notifications';
import { Gtk } from 'astal/gtk3';

export function CenterModule() {
  return (
    <box halign={Gtk.Align.CENTER} className="container center-module module">
      <Notifications />

      <ModuleSeparator />

      <Clock />

      <Media />
    </box>
  );
}
