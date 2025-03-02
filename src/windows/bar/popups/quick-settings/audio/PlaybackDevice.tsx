import { icons } from '@shared/icons';
import { bind } from 'astal';
import { Gtk } from 'astal/gtk3';
import Wp from 'gi://AstalWp';
import AstalWp from 'gi://AstalWp';

interface PlaybackDeviceProps {
  device: Wp.Endpoint;
}

export function PlaybackDevice({ device }: PlaybackDeviceProps) {
  const { AUDIO_MICROPHONE, AUDIO_SPEAKER } = AstalWp.MediaClass;
  const [speaker, mic, defaultIcon] = [
    icons.audio.type.speaker,
    icons.audio.mic.high,
    icons.audio.type.card,
  ];

  const className = bind(device, 'isDefault').as((isDefault) => {
    const className = 'qs-list-item';
    return isDefault ? `${className} active` : className;
  });

  let icon: string;
  switch (device.mediaClass) {
    case AUDIO_MICROPHONE: {
      icon = mic;
      break;
    }
    case AUDIO_SPEAKER: {
      icon = speaker;
      break;
    }
    default: {
      icon = defaultIcon;
    }
  }

  return (
    <button
      className={className}
      cursor="pointer"
      onClick={() => device.set_is_default(true)}
      hexpand
      halign={Gtk.Align.FILL}
    >
      <box>
        <icon icon={icon} />
        <label
          label={device.name || device.description}
          tooltipMarkup={device.name || device.description}
          halign={Gtk.Align.START}
          maxWidthChars={40}
          truncate
        />
      </box>
    </button>
  );
}
