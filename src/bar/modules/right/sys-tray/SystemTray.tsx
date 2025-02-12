import { Language } from '@bar/modules/right/sys-tray/Language';
import { TrayItem } from '@bar/modules/right/sys-tray/TrayItem';
import { tray } from '@shared';
import { bind } from 'astal';

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
