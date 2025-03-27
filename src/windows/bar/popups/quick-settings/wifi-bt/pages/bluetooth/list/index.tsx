import { bluetoothService } from '@shared/globals';
import { bind, Variable } from 'astal';

import { BluetoothListItem } from './BluetoothListItem';

const devices = bind(bluetoothService, 'devices');

export function BluetoothList() {
  const savedDevices = devices.as((devices) =>
    devices.filter((device) => device.paired || device.trusted),
  );
  const unknownDevices = Variable.derive(
    [devices, savedDevices],
    (devices, savedDevices) =>
      devices.filter((device) => !savedDevices.includes(device)),
  );

  const preparedDevices = Variable.derive(
    [savedDevices, unknownDevices],
    (saved, unknown) => {
      const unknownItems =
        unknown.length > 0 ? ['Unknown Devices', ...unknown] : [];
      const result = ['Saved Devices', ...saved, ...unknownItems];

      return result.map((item) => {
        if (typeof item === 'string') {
          return <label className="qs-list-label" label={item} />;
        }

        return <BluetoothListItem device={item} />;
      });
    },
  );

  return (
    <scrollable vexpand>
      <box vertical className="bluetooth-list">
        {preparedDevices()}
      </box>
    </scrollable>
  );
}
