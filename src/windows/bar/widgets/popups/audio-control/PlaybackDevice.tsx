import { onScroll } from '@shared/utils';
import { RadioButton, Separator } from '@shared/widgets';
import { bind } from 'astal';
import { Gdk, Gtk } from 'astal/gtk3';
import Wp from 'gi://AstalWp';

interface PlaybackDeviceProps {
  device: Wp.Endpoint;
  radioButtonGroup: Gtk.RadioButton;
}

export function PlaybackDevice({
  device,
  radioButtonGroup,
}: PlaybackDeviceProps) {
  return (
    <box vertical>
      <box css="margin: 0 8px;">
        <RadioButton
          cursor="pointer"
          active={bind(device, 'isDefault')}
          onButtonPressEvent={(self) => {
            if (self.active) {
              return true;
            }
            device.set_is_default(true);
            if (!device.isDefault) return true;
          }}
          group={radioButtonGroup}
          hexpand
          halign={Gtk.Align.START}
        >
          <label halign={Gtk.Align.START} maxWidthChars={40} lines={2} truncate>
            {device.name || device.description}
          </label>
        </RadioButton>

        <Separator transparent hexpand widthRequest={16} />

        <eventbox
          onClick={() => {
            device.mute = !device.mute;
          }}
        >
          <icon icon={bind(device, 'volumeIcon')} />
        </eventbox>
      </box>

      <slider
        max={1.5}
        setup={(self) => {
          self.connect('scroll-event', (_, event: Gdk.Event) => {
            onScroll(event, {
              onScrollUp: () => (device.volume += 0.05),
              onScrollDown: () => (device.volume -= 0.05),
            });
          });
        }}
        value={bind(device, 'volume')}
        onDragged={(self) => {
          device.volume = self.value;
          device.mute = false;
        }}
      />
    </box>
  );
}
