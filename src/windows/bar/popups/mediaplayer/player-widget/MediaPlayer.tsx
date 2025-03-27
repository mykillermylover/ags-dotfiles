import { bind } from 'astal';

import { PlayerProps } from './player.props';
import { SongControls } from './widgets/controls';
import { SongInfo } from './widgets/info';
import { MediaPlayerContainer } from './widgets/MediaPlayerContainer';

export function MediaPlayer({ player }: PlayerProps) {
  const coverArt = bind(player, 'coverArt').as(
    (coverArt) => `
      background-image: url("${coverArt}");`,
  );

  return (
    <MediaPlayerContainer coverArt={coverArt}>
      <SongInfo player={player} />

      <SongControls player={player} />
    </MediaPlayerContainer>
  );
}
