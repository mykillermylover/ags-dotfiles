import { GObject } from 'astal';
import { astalify, ConstructProps, Gtk } from 'astal/gtk3';

export class CheckBox extends astalify(Gtk.CheckButton) {
  static {
    GObject.registerClass(this);
  }

  constructor(
    props: ConstructProps<CheckBox, Gtk.CheckButton.ConstructorProps>,
  ) {
    super(props as never);
  }
}
