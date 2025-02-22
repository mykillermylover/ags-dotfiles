import { audioService } from '@shared/globals';
import { Popup } from '@shared/widgets';
import { bind } from 'astal';

import { PlaybackDevices } from './PlaybackDevices';

export function AudioControlPopup() {
  const playbackDevices = bind(audioService, 'speakers');

  return (
    <Popup name="audiocontrol">
      <box vertical>
        <label css="margin: 16px 0">AUDIO CONTROL</label>
        <PlaybackDevices playbackDevices={playbackDevices} />
      </box>
    </Popup>
  );
}
