import { bind } from 'astal';
import { MediaPlayerService } from 'shared/connectables';

import { MediaPlayer } from './widgets';

const mediaPlayer = MediaPlayerService.get_default();

export function MediaPlayerWidget() {
  const player = bind(mediaPlayer, 'current');

  return (
    <>
      {player.as((value) => {
        if (!value) {
          return <></>;
        }
        return <MediaPlayer player={value} />;
      })}
    </>
  );
}
