import { onScroll } from '@shared/utils';
import { bind, Variable } from 'astal';
import { Gdk } from 'astal/gtk3';
import { Slider } from 'astal/gtk3/widget';

import { PlayerProps } from '../../player.props';
import { getVolumeIcon } from './helpers';

interface VolumeSliderProps extends PlayerProps {
  invisible?: boolean;
}

export function VolumeSlider({ player, invisible = false }: VolumeSliderProps) {
  const lastVolumeValue = Variable(player.volume);

  const onDragged = ({ value }: Slider) => {
    if (invisible) return true;

    player.set_volume(value);
  };

  const setup = (self: Slider) => {
    self.connect('scroll-event', (_, event: Gdk.Event) => {
      if (invisible) return true;

      onScroll(event, {
        onScrollUp: () => (player.volume += 0.05),
        onScrollDown: () => (player.volume -= 0.05),
      });
    });
  };

  const toggleMute = () => {
    if (player.volume === 0) {
      player.set_volume(lastVolumeValue.get());
    } else {
      lastVolumeValue.set(player.volume);
      player.set_volume(0);
    }
  };

  const iconTooltip = bind(player, 'volume').as((volume) => {
    if (volume === 0) {
      return 'Unmute';
    }

    return 'Mute';
  });

  return (
    <box
      className={`volume-slider ${invisible ? 'invisible' : ''}`}
      tooltipText={invisible ? '' : 'Volume'}
    >
      <eventbox
        cursor={invisible ? undefined : 'pointer'}
        tooltipText={iconTooltip}
        onClick={invisible ? undefined : toggleMute}
      >
        <icon icon={bind(player, 'volume').as(getVolumeIcon)} />
      </eventbox>

      <slider
        setup={setup}
        hexpand
        value={bind(player, 'volume')}
        onDragged={onDragged}
      />
    </box>
  );
}
