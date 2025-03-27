import { BluetoothHeader } from './BluetoothHeader';
import { BluetoothList } from './list';
export function BluetoothPage() {
  return (
    <box vertical name="bluetooth">
      <BluetoothHeader />

      <BluetoothList />
    </box>
  );
}
