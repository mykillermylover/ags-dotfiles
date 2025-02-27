import { audioService } from '@shared/globals';
import { bind } from 'astal';

import { DevicesDrawer } from './DevicesDrawer';

export function AudioControl() {
  return (
    <box vertical className="audio-control">
      <DevicesDrawer
        defaultDevice={audioService.defaultSpeaker}
        devices={bind(audioService, 'speakers')}
      />

      <DevicesDrawer
        defaultDevice={audioService.defaultMicrophone}
        devices={bind(audioService, 'microphones')}
      />
    </box>
  );
}
