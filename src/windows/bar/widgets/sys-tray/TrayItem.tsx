import { isLeftClick, isRightClick } from '@shared/utils';
import { bind, Gio } from 'astal';
import { Astal, Gdk, Gtk } from 'astal/gtk3';
import { Button } from 'astal/gtk3/widget';
import Tray from 'gi://AstalTray';

const createMenu = (menuModel: Gio.MenuModel, actionGroup: Gio.ActionGroup) => {
  const menu = Gtk.Menu.new_from_model(menuModel);
  menu.insert_action_group('dbusmenu', actionGroup);

  return menu;
};

export function TrayItem(props: { item: Tray.TrayItem }) {
  const { item } = props;
  const tooltipMarkup = bind(item, 'tooltipMarkup').as(
    (tooltip) => tooltip || item.title,
  );

  const onItemClick = (
    self: Button,
    event: Astal.ClickEvent,
    item: Tray.TrayItem,
  ) => {
    if (isLeftClick(event)) {
      item.activate(event.x, event.y);
    }

    if (
      isRightClick(event) ||
      (isLeftClick(event) && item.category !== Tray.Category.APPLICATION)
    ) {
      const menu = createMenu(item.menuModel, item.actionGroup);
      menu.popup_at_widget(self, Gdk.Gravity.SOUTH, Gdk.Gravity.NORTH, null);
    }
  };

  return (
    <button
      className="sys-tray-item"
      tooltipMarkup={tooltipMarkup}
      onClick={(self, event) => onItemClick(self, event, item)}
    >
      <icon gicon={bind(item, 'gicon')} />
    </button>
  );
}
