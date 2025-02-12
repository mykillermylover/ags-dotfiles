import Temperature from '@connectables/temperature.connectable';
import { bind } from 'astal';

export function TemperatureInfo() {
  const temperature = Temperature.get_default();

  return (
    <label className="GroupItem">
      {bind(temperature, 'temperature').as(
        (value) => ' ' + value.toFixed(0) + '℃',
      )}
    </label>
  );
}
