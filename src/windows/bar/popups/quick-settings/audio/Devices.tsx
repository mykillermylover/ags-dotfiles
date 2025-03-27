import { Binding } from 'astal';
import Wp from 'gi://AstalWp';

import { PlaybackDevice } from './PlaybackDevice';

interface PlaybackDevicesProps {
  devices: Binding<Wp.Endpoint[]>;
}

export function Devices({ devices }: PlaybackDevicesProps) {
  return (
    <box className="devices-list" vertical spacing={2}>
      {devices.as((devices) => {
        return devices.map((device) => <PlaybackDevice device={device} />);
      })}
    </box>
  );
}
