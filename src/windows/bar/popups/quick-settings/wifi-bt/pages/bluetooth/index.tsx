import { bluetoothService } from '@shared/globals';
import { bind, Variable } from 'astal';

import { BluetoothHeader } from './BluetoothHeader';
import { BluetoothList } from './BluetoothList';

const devices = bind(bluetoothService, 'devices');

export function BluetoothPage() {
  const savedDevices = devices.as((devices) =>
    devices.filter((device) => device.paired || device.trusted),
  );
  const unknownDevices = Variable.derive(
    [devices, savedDevices],
    (devices, savedDevices) =>
      devices.filter((device) => !savedDevices.includes(device)),
  );

  return (
    <box vertical name="bluetooth">
      <BluetoothHeader />

      {savedDevices.as((devices) =>
        BluetoothList({ devices, label: 'Saved Devices' }),
      )}
      {unknownDevices((devices) =>
        BluetoothList({ devices, label: 'Unknown Devices' }),
      )}
    </box>
  );
}
