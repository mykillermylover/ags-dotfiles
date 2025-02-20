import { Clock } from '@bar/widgets/clock';
import { Media } from '@bar/widgets/media-button';
import { ModuleSeparator } from '@bar/widgets/ModuleSeparator';
import { icons } from '@shared/icons';
import { Gtk } from 'astal/gtk3';

export function CenterModule() {
  return (
    <box halign={Gtk.Align.CENTER} className="container center-module module">
      <icon className="module-item" icon={icons.notifications.noisy} />
      <ModuleSeparator />

      <Clock />

      <Media />
    </box>
  );
}
