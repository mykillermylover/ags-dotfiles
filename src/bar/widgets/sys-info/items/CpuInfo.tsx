import { getCoresPercentage, getCpuPercentage } from '@shared/globals';

export function CpuInfo() {
  const total = getCpuPercentage.as((value) => `${value.toFixed(0)}%`);

  const cores = getCoresPercentage.as((value) => {
    let result = `Total: ${total.get()}`;

    value.forEach((value, index) => {
      result += `\nCore ${index}: ${value.toFixed(0)}%`;
    });

    return result;
  });

  return (
    <label
      className="sys-info-item"
      label={total.as((value) => ` ${value}`)}
      tooltipMarkup={cores}
    />
  );
}
