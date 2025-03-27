import { icons } from '@shared/icons';

const VOLUME_LEVELS = {
  0: 'low',
  50: 'medium',
  100: 'high',
  125: 'overamplified',
} as const;

type VolumeLevel = keyof typeof VOLUME_LEVELS;

const { volume } = icons.audio;

export const getVolumeIcon = (volumeValue: number): string => {
  volumeValue = Math.round(volumeValue * 100);

  const volumes: VolumeLevel[] = [125, 100, 50, 0];
  let closest: VolumeLevel = 125;

  if (volumeValue === 0) {
    return volume.muted;
  }

  for (const volume of volumes) {
    if (Math.abs(volumeValue - volume) < Math.abs(volumeValue - closest)) {
      closest = volume;
    }
  }

  const key = VOLUME_LEVELS[closest];

  return volume[key];
};
