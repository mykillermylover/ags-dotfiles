import { getBatteryIcon } from '@bar/modules/right/battery/helpers';
import { bind, Variable } from 'astal';
import AstalBattery from 'gi://AstalBattery';

const battery = AstalBattery.get_default();

export function Battery() {
  const icon = Variable.derive(
    [
      bind(battery, 'percentage'),
      bind(battery, 'charging'),
      bind(battery, 'state'),
    ],
    (batteryPercentage, isCharging, state: AstalBattery.State) => {
      const isCharged = state === AstalBattery.State.FULLY_CHARGED;
      const percentage = Math.round(batteryPercentage * 100);

      return `${getBatteryIcon(percentage, isCharging, isCharged)} ${percentage}%`;
    },
  );
  return (
    <label
      onDestroy={() => {
        icon.drop();
      }}
    >
      {icon()}
    </label>
  );
}
