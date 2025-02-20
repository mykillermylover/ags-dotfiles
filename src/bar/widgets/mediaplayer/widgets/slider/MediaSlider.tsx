import { bind, Variable } from 'astal';
import { Slider } from 'astal/gtk3/widget';

import { PlayerProps } from '../../player.props';

export function MediaSlider({ player }: PlayerProps) {
  const position = bind(player, 'position').as((pos) => Math.max(pos, 0));
  const length = bind(player, 'length').as((len) => Math.max(len, 0));

  const sliderDataBinding = Variable.derive(
    [position, length],
    (position, length) => ({
      position,
      length,
    }),
  );

  const onDragged = ({ value }: Slider) => {
    player.set_position(value);
  };

  const tooltip = sliderDataBinding(({ position }) => {
    const minutes = Math.floor(position / 60).toString();
    const seconds = Math.floor(position % 60).toString();

    return `${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
  });

  return (
    <box hexpand className="mediaplayer-slider">
      <slider
        max={length}
        onDestroy={() => {
          sliderDataBinding.drop();
        }}
        hexpand
        value={position}
        tooltipMarkup={tooltip}
        onDragged={onDragged}
      />
    </box>
  );
}
