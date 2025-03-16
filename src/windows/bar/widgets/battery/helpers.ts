import { icons } from '@shared/icons';

const BATTERY_LEVELS = {
  0: 'empty',
  25: 'caution',
  50: 'low',
  75: 'good',
  100: 'full',
} as const;

type BatteryLevel = keyof typeof BATTERY_LEVELS;

const battery = icons.battery;

export const getBatteryIcon = (
  batteryPercentage: number,
  charging: boolean,
): string => {
  const percentages: BatteryLevel[] = [100, 75, 50, 25, 0];
  let closest: BatteryLevel = 100;

  for (const percentage of percentages) {
    if (
      Math.abs(batteryPercentage - percentage) <
      Math.abs(batteryPercentage - closest)
    ) {
      closest = percentage;
    }
  }

  const key = BATTERY_LEVELS[closest];

  if (charging) {
    return battery.charging[key];
  }

  return battery.noCharging[key];
};
