import { GObject } from 'astal';
import { astalify, ConstructProps, Gtk } from 'astal/gtk3';

export class ComboBox extends astalify(Gtk.ComboBox) {
  static {
    GObject.registerClass(this);
  }

  constructor(props: ConstructProps<ComboBox, Gtk.ComboBox.ConstructorProps>) {
    super(props as never);
  }
}
