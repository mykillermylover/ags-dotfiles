import { openPopup } from '@shared/utils';
import { Gtk } from 'astal/gtk3';

export function PowerMenu() {
  const onClicked = (widget: Gtk.Widget) => openPopup(widget, 'power-menu');
  return (
    <button
      className="txt-icon module-item"
      cursor="pointer"
      label=""
      onClicked={onClicked}
    />
  );
}
