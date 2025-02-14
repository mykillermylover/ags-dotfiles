import { Popup } from '@shared/components';
import { audioService } from '@shared/globals';
import { bind } from 'astal';

import { PlaybackDevices } from './PlaybackDevices';

export function AudioControlMenu() {
  const playbackDevices = bind(audioService, 'speakers');

  return (
    <Popup name="audio_control">
      <box
        vertical
        css={`
          padding: 8px 16px;
          border-radius: 8px;
          background-color: #322f27;
          border: 1px solid #e4e4e4;
        `}
      >
        <label css="margin: 16px 0">AUDIO CONTROL</label>
        <PlaybackDevices playbackDevices={playbackDevices} />
      </box>
    </Popup>
  );
}
