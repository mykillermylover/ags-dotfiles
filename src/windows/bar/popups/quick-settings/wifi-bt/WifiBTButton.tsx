import { bluetoothService, networkService } from '@shared/globals';
import { icons } from '@shared/icons';
import { bind, Binding } from 'astal';

import { ArrowButton } from '../arrow-button';

interface Props {
  activePage: Binding<string | undefined>;

  wifiOnArrowClick?: () => void;
  bluetoothOnArrowClick?: () => void;
}

export function WifiBTButton({
  activePage,
  wifiOnArrowClick,
  bluetoothOnArrowClick,
}: Props) {
  const wifi = networkService.wifi;

  const bluetoothIcon = bind(bluetoothService, 'isPowered').as((powered) =>
    powered ? icons.bluetooth.enabled : icons.bluetooth.disabled,
  );
  const bluetoothSubtitle = bind(bluetoothService, 'isConnected').as(() => {
    const connectedDevice = bluetoothService.devices.find(
      (item) => item.connected,
    );

    return connectedDevice ? connectedDevice.name : 'No device';
  });

  const toggleWifi = () => wifi.set_enabled(!wifi.enabled);
  const toggleBluetooth = () => bluetoothService.toggle();

  const className = (name: string) =>
    activePage.as((page) => (name === page ? `${name} active` : name));

  return (
    <box homogeneous name="wifi-bt">
      <ArrowButton
        onArrowClick={wifiOnArrowClick}
        onButtonClick={toggleWifi}
        icon={bind(wifi, 'iconName')}
        title="WI-FI"
        className={className('wifi')}
        subtitle={bind(wifi, 'ssid')}
      />

      <ArrowButton
        onArrowClick={bluetoothOnArrowClick}
        onButtonClick={toggleBluetooth}
        icon={bluetoothIcon}
        title="Bluetooth"
        className={className('bluetooth')}
        subtitle={bluetoothSubtitle}
      />
    </box>
  );
}
