import { TemperatureService } from '@shared/connectables';
import { bind } from 'astal';

export function TemperatureInfo() {
  const temperature = TemperatureService.get_default();

  return (
    <box className="sys-info-item">
      <label label="" className="txt-icon" />
      <label
        label={bind(temperature, 'temperature').as(
          (value) => value.toFixed(0) + '℃',
        )}
      />
    </box>
  );
}
