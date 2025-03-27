import { icons } from '@shared/icons';
import AstalBluetooth from 'gi://AstalBluetooth';

interface Props {
  device: AstalBluetooth.Device;
}

export function BluetoothListItem({ device }: Props) {
  const { icon, name, address, paired, trusted } = device;

  const getIcon = (iconName: string | null) => {
    if (!iconName?.trim()) {
      return icons.bluetooth.enabled;
    }
    return `${iconName}-symbolic`;
  };

  return (
    <button onClick={() => {}} cursor="pointer" className="qs-list-item">
      <box>
        <icon icon={getIcon(icon)} />
        <label>{name || address}</label>
        {/*<label label={`paired: ${paired ? 'true' : 'false'}`} />*/}
        {/*<label label={`trusted: ${trusted ? 'true' : 'false'}`} />*/}
      </box>
    </button>
  );
}
