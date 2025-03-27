import { icons } from '@shared/icons';
import { bind } from 'astal';
import Mpris from 'gi://AstalMpris';

import { PlayerProps } from '../../player.props';
import { MediaControlButton } from './MediaControlButton';

export function Shuffle({ player }: PlayerProps) {
  const { OFF, ON, UNSUPPORTED } = Mpris.Shuffle;

  const { enabled } = icons.mpris.shuffle;

  const className = 'shuffle-icon';

  const shuffleStatus = bind(player, 'shuffleStatus').as((shuffle) => {
    let status = '';
    switch (shuffle) {
      case UNSUPPORTED: {
        status = 'unsupported';
        break;
      }
      case ON: {
        status = 'on';
        break;
      }
      case OFF: {
        status = 'off';
        break;
      }
    }

    return `${className} ${status}`;
  });

  return (
    <MediaControlButton onClickRelease={() => player.shuffle()}>
      <icon icon={enabled} className={shuffleStatus} />
    </MediaControlButton>
  );
}
