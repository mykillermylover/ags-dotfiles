import { GObject } from 'astal';
import { astalify, ConstructProps, Gtk } from 'astal/gtk3';

export class SpinButton extends astalify(Gtk.SpinButton) {
  static {
    GObject.registerClass(this);
  }

  constructor(
    props: ConstructProps<SpinButton, Gtk.SpinButton.ConstructorProps>,
  ) {
    super(props as never);
  }
}
