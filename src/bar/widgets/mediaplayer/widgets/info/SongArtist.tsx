import { PlayerProps } from '@bar/widgets/mediaplayer/player.props';
import { bind } from 'astal';
import { Gtk } from 'astal/gtk3';

import { infoItemClass } from './index';

export function SongArtist({ player }: PlayerProps) {
  return (
    <box halign={Gtk.Align.CENTER}>
      <label
        className={`${infoItemClass} artist`}
        label={bind(player, 'artist')}
        truncate
        maxWidthChars={54}
      />
    </box>
  );
}
