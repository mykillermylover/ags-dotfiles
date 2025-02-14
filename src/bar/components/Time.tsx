import { systemTime } from '@shared/globals';
import { openPopup } from '@shared/utils';

export function Time() {
  return (
    <eventbox
      cursor="pointer"
      onClick={(self) => openPopup(self, 'calendar_popup')}
    >
      <label>{systemTime((time) => time.format('%H:%M 󰸗 '))}</label>
    </eventbox>
  );
}
