import { bluetoothService } from '@shared/globals';
import { icons } from '@shared/icons';
import { bind } from 'astal';
import { Gtk } from 'astal/gtk3';

export function BluetoothPage() {
  const getIcon = (iconName: string | null) => {
    if (!iconName?.trim()) {
      return icons.bluetooth.enabled;
    }
    return `${iconName}-symbolic`;
  };

  const scan = () => {
    bluetoothService.adapter.start_discovery();
  };
  const stopScan = () => {
    bluetoothService.adapter.stop_discovery();
  };

  return (
    <box vertical name="bluetooth">
      {bind(bluetoothService.adapter, 'discovering').as((scanning) => (
        <button
          halign={Gtk.Align.FILL}
          className={scanning ? 'reverse-tertiary' : 'reverse-secondary'}
          onClick={scanning ? stopScan : scan}
        >
          {scanning ? 'STOP SCAN' : 'SCAN'}
        </button>
      ))}

      <scrollable vexpand>
        <box vertical>
          {bind(bluetoothService, 'devices').as((devices) =>
            devices.map((device) => {
              const { name, icon, batteryPercentage } = device;

              return (
                <button cursor="pointer" className="qs-list-item">
                  <box vertical>
                    <icon icon={getIcon(icon)} />
                    <label>{name || device.address}</label>
                    <label>{`batteryPercentage: ${batteryPercentage}`}</label>
                    <label
                      label={`connected: ${device.connected ? 'true' : 'false'}`}
                    />
                    <label
                      label={`connecting: ${device.connecting ? 'true' : 'false'}`}
                    />
                    <label
                      label={`legacyPairing: ${
                        device.legacyPairing ? 'true' : 'false'
                      }`}
                    />
                    <label label={`modalias: ${device.modalias}`} />
                    <label
                      label={`paired: ${device.paired ? 'true' : 'false'}`}
                    />
                    <label label={`rssi: ${device.rssi}`} />
                    <label
                      label={`trusted: ${device.trusted ? 'true' : 'false'}`}
                    />
                  </box>
                </button>
              );
            }),
          )}
        </box>
      </scrollable>
    </box>
  );
}
