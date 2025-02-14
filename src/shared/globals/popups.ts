import { Variable } from 'astal';
import { App } from 'astal/gtk3';
import { EventBox } from 'astal/gtk3/widget';

export const globalPopupEventBoxes = Variable<Record<string, EventBox>>({});

export const closeAllPopups = () => {
  for (const name of Object.keys(globalPopupEventBoxes.get())) {
    App.get_window(name)?.set_visible(false);
  }
};
