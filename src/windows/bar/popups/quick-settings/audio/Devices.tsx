import { Binding } from 'astal';
import { Gtk } from 'astal/gtk3';
import Wp from 'gi://AstalWp';

import { PlaybackDevice } from './PlaybackDevice';

interface PlaybackDevicesProps {
  devices: Binding<Wp.Endpoint[]>;
}

export function Devices({ devices }: PlaybackDevicesProps) {
  return (
    <>
      {devices.as((devices) => {
        return (
          <box
            className="devices-list"
            halign={Gtk.Align.FILL}
            vertical
            spacing={2}
          >
            {devices.map((device) => (
              <PlaybackDevice device={device} />
            ))}
          </box>
        );
      })}
    </>
  );
}
