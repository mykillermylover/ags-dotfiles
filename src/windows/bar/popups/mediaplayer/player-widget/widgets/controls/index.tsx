import { Gtk } from 'astal/gtk3';

import { PlayerProps } from '../../player.props';
import { MediaSlider } from '../slider/MediaSlider';
import { Loop } from './Loop';
import { PlayPause } from './PlayPause';
import { Shuffle } from './Shuffle';
import { TracksControl } from './TracksControl';
import { VolumeSlider } from './VolumeSlider';

export const songControlsItemClass = 'song-controls-item';

export function SongControls({ player }: PlayerProps) {
  return (
    <box vertical className="song-controls" halign={Gtk.Align.CENTER}>
      <MediaSlider player={player} />

      <box>
        <VolumeSlider invisible player={player} />

        <box halign={Gtk.Align.CENTER} hexpand>
          <Shuffle player={player} />

          <TracksControl player={player} direction={'left'} />

          <PlayPause player={player} />

          <TracksControl player={player} direction={'right'} />

          <Loop player={player} />
        </box>

        <VolumeSlider player={player} />
      </box>
    </box>
  );
}
