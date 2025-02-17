import icons from '@shared/icons/icons';
import { Separator } from '@shared/widgets';
import { bind } from 'astal';
import { Gtk } from 'astal/gtk3';
import Mpris from 'gi://AstalMpris';

import { getPlayerLabel, getPlayIcon } from '../helpers';
import { MediaPlayerContainer } from './MediaPlayerContainer';

interface MediaPlayerControlProps {
  player: Mpris.Player;
}

export function MediaPlayerControl({ player }: MediaPlayerControlProps) {
  const label = getPlayerLabel(player);

  const coverArt = bind(player, 'coverArt').as(
    (coverArt) => `
      background-image: url("${coverArt}");
    `,
  );

  return (
    <MediaPlayerContainer className="mediaplayer">
      <box
        css={coverArt}
        className="mediaplayer-cover"
        heightRequest={250}
        widthRequest={400}
      >
        <box
          vertical
          className="mediaplayer-content"
          valign={Gtk.Align.FILL}
          halign={Gtk.Align.FILL}
          hexpand
          vexpand
        >
          <Separator vexpand transparent valign={Gtk.Align.START} />
          <box vertical valign={Gtk.Align.END} halign={Gtk.Align.CENTER}>
            <label>{label}</label>
            <Separator transparent heightRequest={8} />
            <box vexpand halign={Gtk.Align.CENTER}>
              <button onClicked={() => player.previous()} cursor="pointer">
                <icon icon={icons.mpris.prev} />
              </button>

              <button onClicked={() => player.play_pause()} cursor="pointer">
                <icon
                  icon={bind(player, 'metadata').as(() => getPlayIcon(player))}
                />
              </button>

              <button onClicked={() => player.next()} cursor="pointer">
                <icon icon={icons.mpris.next} />
              </button>
            </box>
          </box>
          <Separator vexpand transparent valign={Gtk.Align.END} />
        </box>
      </box>
    </MediaPlayerContainer>
  );
}
