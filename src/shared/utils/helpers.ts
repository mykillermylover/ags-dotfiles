import { Time, timeout } from 'astal';

export const delay = (ms: number, callback?: () => void): Promise<void> =>
  new Promise((resolve) =>
    timeout(ms, () => {
      callback?.();
      resolve();
    }),
  );

export function debounce<F extends (...args: Parameters<F>) => ReturnType<F>>(
  func: F,
  ms: number,
) {
  let debounceTimeout: Time;

  return function (...args: Parameters<F>) {
    debounceTimeout?.cancel();

    debounceTimeout = timeout(ms, () => func(...args));
  };
}

export const centerMultilineString = (multiLineString: string | string[]) => {
  const strings = Array.isArray(multiLineString)
    ? multiLineString
    : multiLineString.split('\n').map((line) => line.trim());
  const result: string[] = [];

  if (strings.length === 0 || strings.length === 1) {
    return strings.join('\n');
  }

  const longestLength = [...strings]
    .sort((a, b) => b.length - a.length)
    .at(0)!.length;

  for (const line of strings) {
    const marginSize = (longestLength - line.length) / 2;
    const margin = ' '.repeat(marginSize);

    result.push(`${margin}${line}${margin}`);
  }

  return result.join('\n');
};
