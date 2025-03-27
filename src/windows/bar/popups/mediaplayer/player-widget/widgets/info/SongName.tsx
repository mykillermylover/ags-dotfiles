import { bind } from 'astal';
import { Gtk } from 'astal/gtk3';

import { PlayerProps } from '../../player.props';
import { infoItemClass } from './index';

const MAX_WIDTH_CHARS = 35;

export function SongName({ player }: PlayerProps) {
  const label = bind(player, 'title');
  const tooltip = label.as((label) =>
    label.length > MAX_WIDTH_CHARS ? label : '',
  );

  return (
    <box halign={Gtk.Align.CENTER}>
      <label
        className={`${infoItemClass} name`}
        label={label}
        truncate
        tooltipText={tooltip}
        maxWidthChars={MAX_WIDTH_CHARS}
      />
    </box>
  );
}
