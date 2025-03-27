import { bind } from 'astal';
import { Gtk } from 'astal/gtk3';

import { PlayerProps } from '../../player.props';
import { infoItemClass } from './index';

export function SongAlbum({ player }: PlayerProps) {
  return (
    <box halign={Gtk.Align.CENTER}>
      <label
        className={`${infoItemClass} album`}
        label={bind(player, 'album')}
        truncate
        maxWidthChars={70}
      />
    </box>
  );
}
