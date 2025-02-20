import { PlayerProps } from '../../player.props';
import { SongAlbum } from './SongAlbum';
import { SongArtist } from './SongArtist';
import { SongName } from './SongName';

export const infoItemClass = 'song-info-item';
export function SongInfo({ player }: PlayerProps) {
  return (
    <box className="song-info" vertical>
      <SongName player={player} />
      <SongArtist player={player} />
      <SongAlbum player={player} />
    </box>
  );
}
