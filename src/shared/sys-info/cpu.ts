import { sysInfo } from '@config';
import { Variable } from 'astal';
import GTop from 'gi://GTop';

interface CpuCoreInfo {
  total: number;
  idle: number;
  user: number;
}

let prevBuffer = new GTop.glibtop_cpu();
const cpuBuffer = new GTop.glibtop_cpu();
GTop.glibtop_get_cpu(cpuBuffer);

export const cpu = Variable(cpuBuffer).poll(sysInfo.pollInterval, (prev) => {
  prevBuffer = prev;

  GTop.glibtop_get_cpu(cpuBuffer);

  return new GTop.glibtop_cpu(cpuBuffer);
});

export const getCpuPercentage = cpu((current) =>
  getCorePercentage(prevBuffer, current),
);
export const getCoresPercentage = cpu((current) =>
  getCpuCoresPercentage(prevBuffer, current),
);

const getCpuCoresPercentage = (
  prevInfo: GTop.glibtop_cpu,
  currentInfo: GTop.glibtop_cpu,
) => {
  const length = currentInfo.xcpu_total.filter((item) => item !== 0).length;
  const result: number[] = [];

  for (let i = 0; i < length; i++) {
    const prev: CpuCoreInfo = {
      user: prevInfo.xcpu_user[i],
      total: prevInfo.xcpu_total[i],
      idle: prevInfo.xcpu_idle[i],
    };
    const current: CpuCoreInfo = {
      user: currentInfo.xcpu_user[i],
      total: currentInfo.xcpu_total[i],
      idle: currentInfo.xcpu_idle[i],
    };

    result.push(getCorePercentage(prev, current));
  }

  return result;
};

const getCorePercentage = (prev: CpuCoreInfo, current: CpuCoreInfo) => {
  const totalDiff = current.total - prev.total;
  const idleDiff = current.idle - prev.idle;

  return totalDiff > 0
    ? ((totalDiff - idleDiff) / totalDiff) * 100
    : (current.user / current.total) * 100;
};
