import { MediaPlayerService } from '@connectables';
import { Popup } from '@shared/widgets';
import { MediaPlayerWidget } from '@windows/bar/widgets/mediaplayer';
import { bind } from 'astal';
import { Gdk, Gtk } from 'astal/gtk3';

const mediaPlayerService = MediaPlayerService.get_default();

export function MediaPlayerPopup() {
  const { CENTER } = Gtk.Align;
  const player = bind(mediaPlayerService, 'current');

  return (
    <Popup
      position={[CENTER]}
      name={'mediaplayer'}
      className="container mediaplayer-popup"
      windowKeyPressHandler={(key) => {
        if (key === Gdk.KEY_space) {
          player.get()?.play_pause();
        }
      }}
    >
      <MediaPlayerWidget player={player} />
    </Popup>
  );
}
