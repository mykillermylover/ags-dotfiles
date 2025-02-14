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
  return player.playbackStatus === Mpris.PlaybackStatus.PLAYING ? ' ' : ' ';
}

export function getFirstPlayingPlayer(
  players: Mpris.Player[],
  currentPlayer?: Mpris.Player,
) {
  if (players.length === 0) {
    return;
  }

  for (const player of players) {
    if (player.playback_status === Mpris.PlaybackStatus.PLAYING) {
      return player;
    }
  }

  return currentPlayer ?? players[0];
}
