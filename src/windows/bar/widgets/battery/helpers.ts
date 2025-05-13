import { icons } from '@shared/icons';

const batteryIcons = icons.battery;

export const getBatteryIcon = (
  iconName?: string,
  batteryIconName?: string,
): string => {
  return batteryIconName ?? iconName ?? batteryIcons.noCharging.full;
};
