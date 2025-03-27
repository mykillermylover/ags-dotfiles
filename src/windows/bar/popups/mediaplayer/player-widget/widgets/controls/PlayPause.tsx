import { bind } from 'astal';

import { getPlayIcon } from '../../helpers';
import { PlayerProps } from '../../player.props';
import { MediaControlButton } from './MediaControlButton';

export function PlayPause({ player }: PlayerProps) {
  return (
    <MediaControlButton onClickRelease={() => player.play_pause()}>
      <icon
        className="play-pause-icon"
        icon={bind(player, 'metadata').as(() => getPlayIcon(player))}
      />
    </MediaControlButton>
  );
}
