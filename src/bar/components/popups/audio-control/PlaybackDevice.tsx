import { RadioButton, Separator } from '@shared/components';
import { bind } from 'astal';
import { Gtk } from 'astal/gtk3';
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
          <label halign={Gtk.Align.START}>
            {device.name || device.description}
          </label>
        </RadioButton>

        <Separator
          css="background-color: transparent;"
          halign={Gtk.Align.FILL}
          widthRequest={80}
        />

        <eventbox
          onClick={() => {
            device.mute = !device.mute;
          }}
        >
          <icon icon={bind(device, 'volumeIcon')} />
        </eventbox>
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
  );
}
