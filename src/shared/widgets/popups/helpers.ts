import { isLeftClick, isRightClick } from '@shared/utils';
import { App, Astal, Gdk } from 'astal/gtk3';

export class PopupHelpers {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  hideOnClick = (_: unknown, event: Gdk.Event | Astal.ClickEvent) => {
    if (isLeftClick(event) || isRightClick(event)) {
      this.hide();
    }
  };

  ignoreOnCLick = (_: unknown, event: Gdk.Event | Astal.ClickEvent) => {
    if (isLeftClick(event) || isRightClick(event)) {
      return true;
    }
  };

  hide = () => App.get_window(this.name)?.set_visible(false);
}
