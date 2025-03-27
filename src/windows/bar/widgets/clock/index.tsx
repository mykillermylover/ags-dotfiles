import { systemTime } from '@shared/globals';
import { centerMultilineString, openPopup } from '@shared/utils';
import { Variable } from 'astal';

export function Clock() {
  const formattedDateTime = (format: string) =>
    systemTime((dateTime) => dateTime.format(format) ?? '');

  const buttonTooltip = Variable.derive(
    [
      formattedDateTime('%d.%m.%Y'),
      formattedDateTime('%H:%M:%S'),
      formattedDateTime('%A'),
    ],
    (date, time, dayName) => centerMultilineString([dayName, time, date]),
  );

  return (
    <button
      className="module-item"
      cursor="pointer"
      onClick={(self) => openPopup(self, 'calendar')}
      tooltipText={buttonTooltip()}
    >
      <box>
        <label>{formattedDateTime('%H:%M ')}</label>
        <label className="txt-icon calendar-icon">{'󰸗'}</label>
      </box>
    </button>
  );
}
