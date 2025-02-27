import { bluetoothService, networkService } from '@shared/globals';
import { icons } from '@shared/icons';
import { bind } from 'astal';

import { ArrowButton } from '../arrow-button';

interface Props {
  wifiOnArrowClick?: () => void;
  bluetoothOnArrowClick?: () => void;
}

export function WifiBTButton({
  wifiOnArrowClick,
  bluetoothOnArrowClick,
}: Props) {
  const wifi = networkService.wifi;

  const bluetoothIcon = bind(bluetoothService, 'isPowered').as((powered) =>
    powered ? icons.bluetooth.enabled : icons.bluetooth.disabled,
  );
  const bluetoothSubtitle = bind(bluetoothService, 'isConnected').as(
    (connected) => (connected ? 'Device connected' : 'No device'),
  );

  const toggleWifi = () => wifi.set_enabled(!wifi.enabled);
  const toggleBluetooth = () => bluetoothService.toggle();

  return (
    <box homogeneous name="wifi-bt">
      <ArrowButton
        onArrowClick={wifiOnArrowClick}
        onButtonClick={toggleWifi}
        icon={bind(wifi, 'iconName')}
        title="WI-FI"
        subtitle={bind(wifi, 'ssid')}
      />
      <ArrowButton
        onArrowClick={bluetoothOnArrowClick}
        onButtonClick={toggleBluetooth}
        icon={bluetoothIcon}
        title="Bluetooth"
        subtitle={bluetoothSubtitle}
      />
    </box>
  );
}
