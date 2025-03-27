import { MediaPlayerService } from '@shared/connectables';
import { centerMultilineString } from '@shared/utils';
import { bind } from 'astal';
import AstalMpris from 'gi://AstalMpris';

import { ModuleSeparator } from '../ModuleSeparator';
import { MediaButton } from './MediaButton';

const { PLAYING, PAUSED, STOPPED } = AstalMpris.PlaybackStatus;

export function Media() {
  const mediaPlayerService = MediaPlayerService.get_default();
  const player = bind(mediaPlayerService, 'current');

  const getTooltip = (player: AstalMpris.Player) => {
    let playbackStatus: string;

    switch (player.playbackStatus) {
      case STOPPED: {
        playbackStatus = '';
        break;
      }
      case PAUSED: {
        playbackStatus = '';
        break;
      }
      case PLAYING: {
        playbackStatus = '';
        break;
      }
    }

    const lowerText = `${player.artist} - ${player.title}`;

    const upperText = `${playbackStatus} ${player.identity}`;

    if (lowerText.length > 50) {
      return centerMultilineString([upperText, player.artist, player.title]);
    }

    return centerMultilineString([upperText, lowerText]);
  };

  return (
    <>
      {player.as((player) => {
        if (!player) return <></>;
        const tooltip = mediaPlayerService.onMetaChange(() =>
          getTooltip(player),
        );

        return (
          <>
            <ModuleSeparator />
            <MediaButton player={player} tooltip={tooltip} />
          </>
        );
      })}
    </>
  );
}
