import {
  closeAllPopups,
  globalPopupEventBoxes,
  hyprlandService,
} from '@shared/globals';
import { App, Gtk } from 'astal/gtk3';

export function openPopup(clickedWidget: Gtk.Widget, name: string) {
  closeAllPopups();
  App.toggle_window(name);

  const window = App.get_window(name);
  const eventBox = globalPopupEventBoxes.get()[name];
  if (!eventBox || !window) return;

  const {
    x: btnX,
    y: btnY,
    width: btnWidth,
    height: btnHeight,
  } = clickedWidget.get_allocation();

  const { width: eventBoxWidth } = eventBox.get_allocation();

  let marginLeft = btnX + btnWidth / 2 - eventBoxWidth / 2;
  const marginTop = btnY + btnHeight / 2;

  const { width: monitorWidth, scale } = hyprlandService.focusedMonitor;

  const scaledWidth = monitorWidth / scale;

  if (scaledWidth < marginLeft + eventBoxWidth) {
    marginLeft = scaledWidth - eventBoxWidth - 8;
  }
  if (marginLeft < 0) {
    marginLeft = 8;
  }

  const eventBoxClassName = eventBox.get_class_name();

  if (!eventBoxClassName.includes('valign')) {
    eventBox?.set_margin_top(marginTop);
  }

  if (!eventBoxClassName.includes('halign')) {
    eventBox?.set_margin_left(marginLeft);
  }
}
