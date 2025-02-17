import { Media } from '@bar/widgets/media-button/Media';
import { Time } from '@bar/widgets/Time';
import { Gtk } from 'astal/gtk3';

export function CenterModule() {
  return (
    <box halign={Gtk.Align.CENTER} className="container center-module module">
      <Time />

      <Media />
    </box>
  );
}
