import { systemTime } from '@shared/globals';
import { openPopup } from '@shared/utils';

export function Clock() {
  return (
    <button
      className="module-item"
      cursor="pointer"
      onClick={(self) => openPopup(self, 'calendar')}
    >
      <box>
        <label>{systemTime((time) => time.format('%H:%M '))}</label>
        <label className="txt-icon calendar-icon">{'󰸗'}</label>
      </box>
    </button>
  );
}
