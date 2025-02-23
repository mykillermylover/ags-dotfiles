import { audioService } from '@shared/globals';
import { getScrollDirection } from '@shared/utils';
import { openPopup } from '@shared/utils/popup';
import { bind, Variable } from 'astal';
import { Astal, Gdk } from 'astal/gtk3';

import { getIcon } from './helpers';

export function AudioControl() {
  const setVolume = (percentage: number, direction: Gdk.ScrollDirection) => {
    const { UP } = Gdk.ScrollDirection;
    const value = direction === UP ? percentage / 100 : -percentage / 100;

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

  const onScroll = (_: unknown, event: Gdk.Event | Astal.ScrollEvent) => {
    const direction = getScrollDirection(event);

    setVolume(5, direction);
  };

  return (
    <button
      className="module-item"
      cursor="pointer"
      onScroll={onScroll}
      onClick={(self) => openPopup(self, 'audiocontrol')}
      onDestroy={() => {
        label.drop();
      }}
    >
      <label
        tooltipMarkup={bind(audioService.defaultSpeaker, 'description')}
        label={label()}
      />
    </button>
  );
}
