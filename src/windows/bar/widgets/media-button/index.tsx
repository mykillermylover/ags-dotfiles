import { MediaPlayerService } from 'shared/connectables';
import { bind } from 'astal';

import { ModuleSeparator } from '../ModuleSeparator';
import { MediaButton } from './MediaButton';

export function Media() {
  const mediaPlayerService = MediaPlayerService.get_default();
  const player = bind(mediaPlayerService, 'current');

  return (
    <>
      {player.as((player) => {
        if (!player) return <></>;
        const tooltip = mediaPlayerService.onMetaChange(
          () => `${player.artist} - ${player.title}\n${player.identity}`,
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
