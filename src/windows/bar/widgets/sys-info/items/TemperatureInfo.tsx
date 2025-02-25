import { TemperatureService } from '@shared/connectables';
import { bind } from 'astal';

export function TemperatureInfo() {
  const temperature = TemperatureService.get_default();

  return (
    <label className="sys-info-item">
      {bind(temperature, 'temperature').as(
        (value) => '' + value.toFixed(0) + '℃',
      )}
    </label>
  );
}
