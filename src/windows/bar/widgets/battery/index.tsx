import { bind, Variable } from 'astal';
import AstalBattery from 'gi://AstalBattery';

import { getBatteryIcon } from './helpers';

const battery = AstalBattery.get_default();

export function Battery() {
  const percentage = bind(battery, 'percentage').as((p) => Math.round(p * 100));

  const icon = Variable.derive(
    [percentage, bind(battery, 'charging')],
    (percentage, isCharging) => getBatteryIcon(percentage, isCharging),
  );
  return (
    <box className="module-item">
      <icon icon={icon()} className="battery-icon" />
      <label
        onDestroy={() => {
          icon.drop();
        }}
      >
        {percentage.as((p) => `${p}%`)}
      </label>
    </box>
  );
}
