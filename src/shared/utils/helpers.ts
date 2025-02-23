import { timeout } from 'astal';

export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => timeout(ms, resolve));
