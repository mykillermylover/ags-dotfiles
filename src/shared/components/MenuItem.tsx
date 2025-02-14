import { GObject } from 'astal';
import { astalify, ConstructProps, Gtk } from 'astal/gtk3';

export class MenuItem extends astalify(Gtk.MenuItem) {
  static {
    GObject.registerClass(this);
  }

  constructor(props: ConstructProps<MenuItem, Gtk.MenuItem.ConstructorProps>) {
    super(props as never);
  }
}
