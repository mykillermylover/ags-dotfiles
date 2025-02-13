import MediaPlayerService from '@connectables/mediaplayer.connectable';
import { bind } from 'astal';
import type { Astal } from 'astal/gtk3';
import Mpris from 'gi://AstalMpris';

import { getPlayerIcon, getPlayIcon } from './helpers';

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
      {player.as((value) => {
        if (!value) {
          return <box />;
        }

        const playerClass = value.identity.toLowerCase();

        const label = bind(value, 'metadata').as(() => {
          const icon = getPlayIcon(value);
          const playerIcon = getPlayerIcon(value);
          const artist = value.artist || null;
          const title = value.title || null;

          const labelText = [artist, title].filter(Boolean).join(' - ');

          return `${icon} ${labelText} ${playerIcon}`;
        });

        return (
          <button
            className={`mediaplayer ${playerClass}`}
            cursor="pointer"
            label={label}
            onClicked={() => value.play_pause()}
            onScroll={(_, event) => onPlayerScroll(value, event)}
          />
        );
      })}
    </box>
  );
}
