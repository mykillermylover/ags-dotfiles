import { Gtk } from 'astal/gtk3';

import { CHILD_POSITION, LayoutProps } from './interfaces';

const Padding = () => <eventbox expand />;

export function Layout({ position, child }: LayoutProps) {
  let widget: Gtk.Widget;

  switch (position) {
    case CHILD_POSITION.TOP: {
      widget = (
        <box vertical>
          {child}
          <Padding />
        </box>
      );
      break;
    }
    case CHILD_POSITION.TOP_CENTER: {
      widget = (
        <box>
          <Padding />
          <box vertical hexpand={false}>
            {child}
            <Padding />
          </box>
          <Padding />
        </box>
      );
      break;
    }
    case CHILD_POSITION.TOP_LEFT: {
      widget = (
        <box>
          <box vertical hexpand={false}>
            {child}
            <Padding />
          </box>
          <Padding />
        </box>
      );
      break;
    }
    case CHILD_POSITION.TOP_RIGHT: {
      widget = (
        <box>
          <Padding />
          <box vertical hexpand={false}>
            {child}
            <Padding />
          </box>
        </box>
      );
      break;
    }
    case CHILD_POSITION.BOTTOM: {
      widget = (
        <box vertical>
          <Padding />
          {child}
        </box>
      );
      break;
    }
    case CHILD_POSITION.BOTTOM_CENTER: {
      widget = (
        <box>
          <Padding />
          <box vertical hexpand={false}>
            <Padding />
            {child}
          </box>
          <Padding />
        </box>
      );
      break;
    }
    case CHILD_POSITION.BOTTOM_LEFT: {
      widget = (
        <box>
          <box vertical hexpand={false}>
            <Padding />
            {child}
          </box>
          <Padding />
        </box>
      );
      break;
    }
    case CHILD_POSITION.BOTTOM_RIGHT: {
      widget = (
        <box>
          <Padding />
          <box vertical hexpand={false}>
            <Padding />
            {child}
          </box>
        </box>
      );
      break;
    }
    //default to center
    default: {
      widget = (
        <centerbox>
          <Padding />
          <centerbox orientation={Gtk.Orientation.VERTICAL}>
            <Padding />
            {child}
            <Padding />
          </centerbox>
          <Padding />
        </centerbox>
      );
    }
  }

  const hPosition = position?.split('_').at(1);
  if (hPosition && hPosition !== 'center') {
    widget.set({ css: `margin-${hPosition}: 8px;` });
  }

  return widget;
}
