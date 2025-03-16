import { bluetoothService } from '@shared/globals';
import { bind } from 'astal';
import { Gtk } from 'astal/gtk3';

export function BluetoothHeader() {
  const adapter = bluetoothService.adapter;

  const scan = () => {
    bluetoothService.adapter.start_discovery();
  };
  const stopScan = () => {
    bluetoothService.adapter.stop_discovery();
  };

  return (
    <box>
      {bind(adapter, 'discovering').as((scanning) => (
        <button
          cursor="pointer"
          hexpand
          halign={Gtk.Align.END}
          className={scanning ? 'reverse-tertiary' : 'reverse-secondary'}
          onClick={scanning ? stopScan : scan}
        >
          {scanning ? 'STOP SCAN' : 'SCAN'}
        </button>
      ))}
    </box>
  );
}
