import { PlaybackDevice } from '@components/audio-control/PlaybackDevice.tsx';
import { Binding } from 'astal';
import { Gtk } from 'astal/gtk3';
import Wp from 'gi://AstalWp';
import { RadioButton, Separator } from 'shared/components';

interface PlaybackDevicesProps {
  playbackDevices: Binding<Wp.Endpoint[]>;
}

export function PlaybackDevices({ playbackDevices }: PlaybackDevicesProps) {
  const group = RadioButton.newGroup();

  return (
    <>
      {playbackDevices.as((devices) => {
        return (
          <box halign={Gtk.Align.FILL} vertical>
            {devices.map((device) => (
              <box vertical>
                <Separator
                  heightRequest={8}
                  css="background-color: transparent;"
                />
                <PlaybackDevice device={device} radioButtonGroup={group} />
              </box>
            ))}
          </box>
        );
      })}
    </>
  );
}
