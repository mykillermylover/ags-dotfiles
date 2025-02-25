import { Popup } from '@shared/widgets';
import { MediaPlayerWidget } from '@windows/bar/widgets/mediaplayer';
import { bind } from 'astal';
import { Gdk, Gtk } from 'astal/gtk3';
import { MediaPlayerService } from 'shared/connectables';

const mediaPlayerService = MediaPlayerService.get_default();

export function MediaPlayerPopup() {
  const { CENTER } = Gtk.Align;
  const player = bind(mediaPlayerService, 'current');

  return (
    <Popup
      position={[CENTER]}
      name={'mediaplayer'}
      className="mediaplayer-popup"
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
