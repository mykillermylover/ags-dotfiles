import { icons } from '@shared/icons';

import { PlayerProps } from '../../player.props';
import { MediaControlButton } from './MediaControlButton';

interface ControlButtonProps {
  direction: 'left' | 'right';
}
type TracksControlProps = PlayerProps & ControlButtonProps;

export function TracksControl({ player, direction }: TracksControlProps) {
  const onClickAction = () =>
    direction === 'left' ? player.previous() : player.next();

  const { prev, next } = icons.mpris;

  const icon = direction === 'left' ? prev : next;

  return (
    <MediaControlButton onClickRelease={onClickAction}>
      <icon className="controls-icon" icon={icon} />
    </MediaControlButton>
  );
}
