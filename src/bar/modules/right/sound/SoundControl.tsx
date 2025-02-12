import { getIcon } from '@bar/modules/right/sound/helpers';
import { openMenu } from '@bar/utils/menu.ts';
import { bind, Variable } from 'astal';
import type { Astal } from 'astal/gtk3';
import Wp from 'gi://AstalWp';

const wireplumber = Wp.get_default();
const audioService = wireplumber?.audio;

export function SoundControl() {
  if (!audioService) {
    return null;
  }

  const setVolume = (percentage: number, mode: 'up' | 'down') => {
    const value = mode === 'up' ? percentage / 100 : -percentage / 100;

    audioService.defaultSpeaker.set_volume(
      audioService.defaultSpeaker.volume + value,
    );
  };

  const label = Variable.derive(
    [
      bind(audioService.defaultSpeaker, 'volume'),
      bind(audioService.defaultSpeaker, 'mute'),
    ],
    (volume, isMuted) => {
      const percentage = isMuted ? '' : ` ${Math.round(volume * 100)}%`;

      return `${getIcon(isMuted, volume)}${percentage}`;
    },
  );

  const onScroll = (_: unknown, event: Astal.ScrollEvent) => {
    const direction = event.delta_y < 0 ? 'up' : 'down';

    setVolume(5, direction);
  };

  return (
    <eventbox
      cursor="pointer"
      onScroll={onScroll}
      onClick={(self) => openMenu(self, 'audio_control')}
      onDestroy={() => {
        label.drop();
      }}
    >
      <label
        tooltipMarkup={bind(audioService.defaultSpeaker, 'description')}
        label={label()}
      />
    </eventbox>
  );
}
