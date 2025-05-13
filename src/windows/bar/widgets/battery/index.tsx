import { bind, Variable } from 'astal';
import AstalBattery from 'gi://AstalBattery';

import { getBatteryIcon } from './helpers';

const battery = AstalBattery.get_default();

export function Battery() {
  const percentage = bind(battery, 'percentage').as((p) => Math.round(p * 100));
  const icon = Variable.derive(
    [bind(battery, 'iconName'), bind(battery, 'batteryIconName')],
    getBatteryIcon,
  );

  return (
    <box
      className="module-item"
      onDestroy={() => {
        icon.drop();
      }}
    >
      <icon icon={icon()} className="battery-icon" />
      <label>{percentage.as((p) => `${p}%`)}</label>
    </box>
  );
}
