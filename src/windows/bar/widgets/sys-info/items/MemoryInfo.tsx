import { getMemory, getMemoryPercentage } from '@shared/globals';

export function MemoryInfo() {
  const memPercentage = getMemoryPercentage();

  return (
    <label
      className="sys-info-item"
      label={memPercentage.as((val) => ` ${val}%`)}
      tooltipMarkup={getMemory('GiB').as(({ user, total }) => {
        const userGiB = user.toFixed(1);
        const totalGiB = total.toFixed(1);

        return `${userGiB}/${totalGiB} GiB used`;
      })}
    />
  );
}
