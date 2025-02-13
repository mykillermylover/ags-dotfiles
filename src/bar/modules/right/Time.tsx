import { openMenu } from '@bar/utils/menu.ts';
import { systemTime } from '@shared/globals';

export function Time() {
  return (
    <eventbox
      cursor="pointer"
      onClick={(self) => openMenu(self, 'calendar_dropdown')}
    >
      <label>{systemTime((time) => time.format('%H:%M 󰸗 '))}</label>
    </eventbox>
  );
}
