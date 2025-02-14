import { tray } from '@shared/globals';
import { bind } from 'astal';

import { Language } from './Language';
import { TrayItem } from './TrayItem';

export function SystemTray() {
  const items = bind(tray, 'items').as((items) =>
    items.filter((item) => item.status),
  );

  return (
    <box className="SysTray">
      {items.as((items) => items.map((item) => <TrayItem item={item} />))}

      <Language />
    </box>
  );
}
