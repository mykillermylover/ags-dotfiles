import { icons } from '@shared/icons';
import { onScroll } from '@shared/utils';
import { bind, Binding, Variable } from 'astal';
import { Gdk, Gtk } from 'astal/gtk3';
import { Slider } from 'astal/gtk3/widget';
import AstalWp from 'gi://AstalWp';

interface PlaybackDeviceProps {
  device: AstalWp.Endpoint;
  onClick?: () => void;
  arrowState: Binding<boolean>;
}

export function DefaultDevice({
  device,
  onClick,
  arrowState,
}: PlaybackDeviceProps) {
  const name = Variable.derive(
    [bind(device, 'name'), bind(device, 'description')],
    (name, description) => name || description,
  );

  const icon = bind(device, 'volumeIcon');
  const iconClass = arrowState.as((v) => (v ? 'active' : ''));

  const setup = (self: Slider) => {
    self.connect('scroll-event', (_, event: Gdk.Event) => {
      onScroll(event, {
        onScrollUp: () => (device.volume += 0.05),
        onScrollDown: () => (device.volume -= 0.05),
      });
    });
  };

  return (
    <box
      className="default-device"
      onDestroy={() => {
        name.drop();
      }}
    >
      <eventbox cursor="pointer" onClick={() => device.set_mute(!device.mute)}>
        <icon icon={icon} />
      </eventbox>
      <slider
        tooltipMarkup={name()}
        hexpand
        max={1.5}
        setup={setup}
        value={bind(device, 'volume')}
        onDragged={(self) => {
          device.volume = self.value;
          device.mute = false;
        }}
      />

      <eventbox
        className="arrow"
        onClick={onClick}
        cursor="pointer"
        halign={Gtk.Align.END}
      >
        <icon className={iconClass} icon={icons.ui.arrow.draw.right} />
      </eventbox>
    </box>
  );
}
