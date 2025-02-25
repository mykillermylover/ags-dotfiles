import { audioService } from '@shared/globals';
import { Popup } from '@shared/widgets';
import { bind } from 'astal';

import { DevicesDrawer } from './DevicesDrawer';

export function AudioControlPopup() {
  return (
    <Popup name="audio-control" vertical className="audio-control">
      <DevicesDrawer
        defaultDevice={audioService.defaultSpeaker}
        devices={bind(audioService, 'speakers')}
      />

      <DevicesDrawer
        defaultDevice={audioService.defaultMicrophone}
        devices={bind(audioService, 'microphones')}
      />
    </Popup>
  );
}
