import { Variable } from 'astal';
import { App } from 'astal/gtk3';
import { EventBox } from 'astal/gtk3/widget';

export const globalDropdownEventBoxes = Variable<Record<string, EventBox>>({});

export const closeAllDropdowns = () => {
  for (const name of Object.keys(globalDropdownEventBoxes.get())) {
    App.get_window(name)?.set_visible(false);
  }
};
