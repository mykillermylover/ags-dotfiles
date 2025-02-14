import { sysInfo } from '@bar/config';
import { Variable } from 'astal';
import GTop from 'gi://GTop';

const memBuffer = new GTop.glibtop_mem();
GTop.glibtop_get_mem(memBuffer);

export const memory = Variable(memBuffer).poll(sysInfo.pollInterval, () => {
  GTop.glibtop_get_mem(memBuffer);

  return new GTop.glibtop_mem(memBuffer);
});

export const getMemoryPercentage = (fractionDigits = 0) =>
  memory((value) => {
    const { user, total } = value;
    return ((user / total) * 100).toFixed(fractionDigits);
  });

export const getMemory = (unit: 'B' | 'MiB' | 'GiB' = 'B') =>
  memory(({ user, total }) => {
    user = user / 1024;
    total = total / 1024;

    switch (unit) {
      case 'MiB': {
        user = user / 1024;
        total = total / 1024;
        break;
      }
      case 'GiB': {
        user = user / 1024 / 1024;
        total = total / 1024 / 1024;
        break;
      }
    }

    return {
      user,
      total,
    };
  });
