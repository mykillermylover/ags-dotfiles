import { PlaybackDevices } from '@components/audio-control/PlaybackDevices.tsx';
import { audioService } from '@shared/globals';
import { bind } from 'astal';
import { Dropdown } from 'shared/components';

export function AudioControlMenu() {
  const playbackDevices = bind(audioService, 'speakers');

  return (
    <Dropdown name="audio_control">
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
    </Dropdown>
  );
}
