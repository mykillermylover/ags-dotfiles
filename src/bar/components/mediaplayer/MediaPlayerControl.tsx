import { bind } from 'astal';
import { Astal } from 'astal/gtk3';
import Mpris from 'gi://AstalMpris';

import { getPlayerIcon, getPlayIcon } from './helpers';

interface MediaPlayerControlProps {
  player?: Mpris.Player;
  onScroll?: (player: Mpris.Player, event: Astal.ScrollEvent) => void;
}

export function MediaPlayerControl({
  player,
  onScroll = () => null,
}: MediaPlayerControlProps) {
  if (!player) {
    return <box />;
  }

  const playerClass = player.identity.toLowerCase();

  const label = bind(player, 'metadata').as(() => {
    const icon = getPlayIcon(player);
    const playerIcon = getPlayerIcon(player);
    const artist = player.artist || null;
    const title = player.title || null;

    const labelText = [artist, title].filter(Boolean).join(' - ');

    return `${icon} ${labelText} ${playerIcon} `;
  });

  return (
    <box className={`mediaplayer ${playerClass}`}>
      <button
        cursor="pointer"
        onClicked={() => player.play_pause()}
        onScroll={(_, event) => onScroll(player, event)}
      >
        <label truncate>{label}</label>
      </button>
    </box>
  );
}
