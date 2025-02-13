const batteryIcons: Record<number, string> = {
  0: '󰂎',
  10: '󰁺',
  20: '󰁻',
  30: '󰁼',
  40: '󰁽',
  50: '󰁾',
  60: '󰁿',
  70: '󰂀',
  80: '󰂁',
  90: '󰂂',
  100: '󰁹',
};

const batteryIconsCharging: Record<number, string> = {
  0: '󰢟',
  10: '󰢜',
  20: '󰂆',
  30: '󰂇',
  40: '󰂈',
  50: '󰢝',
  60: '󰂉',
  70: '󰢞',
  80: '󰂊',
  90: '󰂋',
  100: '󰂅',
};

export const getBatteryIcon = (
  percentage: number,
  charging: boolean,
  isCharged: boolean,
): string => {
  const percentages = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0];
  const foundPercentage =
    percentages.find((threshold) => threshold <= percentage) ?? 100;

  if (isCharged) {
    return '󱟢';
  }
  if (charging) {
    return batteryIconsCharging[foundPercentage];
  }

  return batteryIcons[foundPercentage];
};
