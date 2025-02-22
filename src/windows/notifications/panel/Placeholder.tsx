import { icons } from '@shared/icons';
import { Gtk } from 'astal/gtk3';
import { BoxProps } from 'astal/gtk3/widget';

export function Placeholder({ ...props }: BoxProps) {
  return (
    <box className="placeholder" {...props}>
      <box vertical expand valign={Gtk.Align.CENTER}>
        <icon icon={icons.notifications.noisy} />
        <label>There is no notifications..</label>
      </box>
    </box>
  );
}
