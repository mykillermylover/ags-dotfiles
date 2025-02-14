import { MediaPlayerService } from '@connectables';
import { bind } from 'astal';
import type { Astal } from 'astal/gtk3';
import Mpris from 'gi://AstalMpris';

import { MediaPlayerControl } from './MediaPlayerControl';

const mediaPlayer = MediaPlayerService.get_default();

export function MediaPlayer() {
  const player = bind(mediaPlayer, 'current');

  const onPlayerScroll = (player: Mpris.Player, event: Astal.ScrollEvent) => {
    const direction = event.delta_y < 0 ? 'up' : 'down';

    switch (direction) {
      case 'down': {
        player.previous();
        break;
      }

      case 'up': {
        player.next();
        break;
      }
    }
  };

  return (
    <box>
      {player.as((value) => (
        <MediaPlayerControl player={value} onScroll={onPlayerScroll} />
      ))}
    </box>
  );
}
