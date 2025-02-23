import { icons } from '@shared/icons';
import Mpris from 'gi://AstalMpris';

export function getPlayerIcon(player: Mpris.Player) {
  const identity = player.identity.toLowerCase();

  const players = {
    firefox: '',
    spotify: '',
  };

  for (const [playerName, icon] of Object.entries(players)) {
    if (identity.includes(playerName)) {
      return icon;
    }
  }

  return '󰝚';
}

export function getPlayIcon(player: Mpris.Player) {
  return player.playbackStatus === Mpris.PlaybackStatus.PLAYING
    ? icons.mpris.playing
    : icons.mpris.paused;
}
