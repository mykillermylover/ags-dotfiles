import { GObject } from 'astal';
import { astalify, ConstructProps, Gtk } from 'astal/gtk3';

export class Menu extends astalify(Gtk.Menu) {
  static {
    GObject.registerClass(this);
  }

  constructor(props: ConstructProps<Menu, Gtk.Menu.ConstructorProps>) {
    super(props as never);
  }
}
