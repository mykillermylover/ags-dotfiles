import { notifdService } from '@shared/globals';
import { Separator } from '@shared/widgets';
import { bind } from 'astal';
import { Gtk } from 'astal/gtk3';

interface Props {
  onDeleteClick?: () => void;
  onDNDClick?: () => void;
}
export function NotificationPanelHeader({ onDeleteClick, onDNDClick }: Props) {
  const dndClass = bind(notifdService, 'dontDisturb').as((value) =>
    value ? 'tertiary' : 'disabled',
  );

  const headerLabel = bind(notifdService, 'notifications').as(
    (notifications) => `NOTIFICATIONS (${notifications.length})`,
  );

  return (
    <box vertical className="header">
      <box hexpand>
        <button
          halign={Gtk.Align.START}
          cursor="pointer"
          className={dndClass}
          hexpand
          onClicked={onDNDClick}
          label="DND"
        />
        <label
          className="header-text"
          halign={Gtk.Align.CENTER}
          label={headerLabel}
        />
        <button
          cursor="pointer"
          className="clear-icon"
          hexpand
          halign={Gtk.Align.END}
          onClicked={onDeleteClick}
        >
          <icon icon="user-trash-symbolic" />
        </button>
      </box>

      <Separator />
    </box>
  );
}
