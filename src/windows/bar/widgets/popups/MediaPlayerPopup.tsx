import { MediaPlayerService } from '@connectables';
import { Popup } from '@shared/widgets';
import { MediaPlayerWidget } from '@windows/bar/widgets/mediaplayer';
import { bind } from 'astal';
import { Gtk } from 'astal/gtk3';

const mediaPlayerService = MediaPlayerService.get_default();

export function MediaPlayerPopup() {
  const { CENTER } = Gtk.Align;
  const player = bind(mediaPlayerService, 'current');

  return (
    <Popup
      position={[CENTER]}
      name={'mediaplayer'}
      className="container mediaplayer-popup"
    >
      <MediaPlayerWidget player={player} />
    </Popup>
  );
}
