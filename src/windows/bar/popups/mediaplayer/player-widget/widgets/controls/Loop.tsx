import { icons } from '@shared/icons';
import { bind, Variable } from 'astal';
import Mpris from 'gi://AstalMpris';

import { PlayerProps } from '../../player.props';
import { MediaControlButton } from './MediaControlButton';

export function Loop({ player }: PlayerProps) {
  const { none, track, playlist } = icons.mpris.loop;
  const icon = Variable(none);

  const loopStatusCallback = (loopStatus: Mpris.Loop) => {
    const { TRACK, PLAYLIST, UNSUPPORTED } = Mpris.Loop;
    let iconClass = '';
    switch (loopStatus) {
      case TRACK: {
        icon.set(track);
        iconClass = 'on';
        break;
      }
      case PLAYLIST: {
        icon.set(playlist);
        iconClass = 'on';
        break;
      }
      case UNSUPPORTED: {
        iconClass = 'unsupported';
      }
      // eslint-disable-next-line no-fallthrough
      default: {
        icon.set(none);
      }
    }

    return `loop-icon ${iconClass}`;
  };

  const className = bind(player, 'loopStatus').as(loopStatusCallback);

  return (
    <MediaControlButton onClickRelease={() => player.loop()}>
      <icon icon={icon()} className={className} />
    </MediaControlButton>
  );
}
