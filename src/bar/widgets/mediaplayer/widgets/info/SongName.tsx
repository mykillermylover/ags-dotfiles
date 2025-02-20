import { PlayerProps } from '@bar/widgets/mediaplayer/player.props';
import { bind } from 'astal';
import { Gtk } from 'astal/gtk3';

import { infoItemClass } from './index';

export function SongName({ player }: PlayerProps) {
  const label = bind(player, 'title');
  return (
    <box halign={Gtk.Align.CENTER}>
      <label
        className={`${infoItemClass} name`}
        label={label}
        truncate
        maxWidthChars={35}
      />
    </box>
  );
}
