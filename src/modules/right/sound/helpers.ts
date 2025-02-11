const icons: Record<number, string> = {
  100: ' ',
  66: ' ',
  34: ' ',
  1: '',
  0: ' ',
};

export const getIcon = (isMuted: boolean, vol: number): string => {
  if (isMuted) return icons[0];

  const foundVol = [100, 66, 34, 1, 0].find(
    (threshold) => threshold <= vol * 100,
  );

  if (foundVol !== undefined) {
    return icons[foundVol];
  }

  return icons[100];
};
