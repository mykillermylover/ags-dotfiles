import { MediaPlayerService } from '@connectables';
import { bind } from 'astal';

import { MediaPlayerControl } from './widgets';

const mediaPlayer = MediaPlayerService.get_default();

export function MediaPlayer() {
  const player = bind(mediaPlayer, 'current');

  return (
    <>
      {player.as((value) => {
        if (!value) {
          return <></>;
        }
        return <MediaPlayerControl player={value} />;
      })}
    </>
  );
}
