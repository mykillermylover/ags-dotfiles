import { Dropdown } from '@components/shared';
import { bind } from 'astal';
import { Gtk } from 'astal/gtk3';
import Wp from 'gi://AstalWp';

const wireplumber = Wp.get_default()!;
const audioService = wireplumber.audio;

export function AudioControl() {
  const playbackDevices = bind(audioService, 'speakers');
  return (
    <Dropdown name="audio_control">
      {playbackDevices.as((devices) => {
        return (
          <box
            halign={Gtk.Align.FILL}
            vertical
            css={
              'padding: 30px; border-radius: 8px; background-color: #322f27;'
            }
          >
            {devices.map((device) => (
              <box vertical>
                <box hexpand>
                  <eventbox
                    onClick={() => {
                      device.mute = !device.mute;
                    }}
                  >
                    <icon icon={bind(device, 'volumeIcon')} />
                  </eventbox>

                  <label> </label>
                  <label halign={Gtk.Align.START}>
                    {device.name || device.description}
                  </label>

                  <switch
                    state={bind(device, 'isDefault')}
                    hexpand
                    halign={Gtk.Align.END}
                    onNotifyActive={(self) => {
                      device.set_is_default(self.state);
                    }}
                  />
                </box>

                <slider
                  setup={(self) => {
                    // Scroll dont emit `onDragged`
                    self.connect('scroll-event', () => true);
                  }}
                  value={bind(device, 'volume')}
                  onDragged={(self) => {
                    device.volume = self.value;
                    device.mute = false;
                  }}
                />
              </box>
            ))}
          </box>
        );
      })}
    </Dropdown>
  );
}
