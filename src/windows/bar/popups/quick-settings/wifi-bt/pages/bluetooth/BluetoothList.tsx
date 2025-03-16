import { icons } from '@shared/icons';
import AstalBluetooth from 'gi://AstalBluetooth';

interface Props {
  devices: AstalBluetooth.Device[];
  label: string;
}
export function BluetoothList({ devices, label }: Props) {
  const getIcon = (iconName: string | null) => {
    if (!iconName?.trim()) {
      return icons.bluetooth.enabled;
    }
    return `${iconName}-symbolic`;
  };

  return (
    <box vertical>
      <label label={label} className="qs-list-label" />
      <scrollable vexpand>
        <box vertical className="bluetooth-list">
          {devices.map((device) => {
            const { name, icon, batteryPercentage } = device;

            return (
              <button
                onClick={() => {}}
                cursor="pointer"
                className="qs-list-item"
              >
                <box>
                  <icon icon={getIcon(icon)} />
                  <label>{name || device.address}</label>
                  {/*<label>{`batteryPercentage: ${batteryPercentage}`}</label>*/}
                  {/*<label*/}
                  {/*  label={`connected: ${device.connected ? 'true' : 'false'}`}*/}
                  {/*/>*/}
                  {/*<label*/}
                  {/*  label={`connecting: ${device.connecting ? 'true' : 'false'}`}*/}
                  {/*/>*/}
                  {/*<label*/}
                  {/*  label={`legacyPairing: ${*/}
                  {/*    device.legacyPairing ? 'true' : 'false'*/}
                  {/*  }`}*/}
                  {/*/>*/}
                  {/*<label label={`modalias: ${device.modalias}`} />*/}
                  <label
                    label={`paired: ${device.paired ? 'true' : 'false'}`}
                  />
                  {/*<label label={`rssi: ${device.rssi}`} />*/}
                  <label
                    label={`trusted: ${device.trusted ? 'true' : 'false'}`}
                  />
                </box>
              </button>
            );
          })}
        </box>
      </scrollable>
    </box>
  );
}
