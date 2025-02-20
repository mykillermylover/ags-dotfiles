import { MediaPlayerWidget } from '@bar/widgets/mediaplayer';
import { MediaPlayerService } from '@connectables';
import { Popup } from '@shared/widgets';
import { bind } from 'astal';
import { Gtk } from 'astal/gtk3';

export function MediaPlayerPopup() {
  const { CENTER } = Gtk.Align;
  const player = bind(MediaPlayerService.get_default(), 'current');
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
