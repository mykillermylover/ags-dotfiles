import { GObject } from 'astal';
import { astalify, ConstructProps, Gtk } from 'astal/gtk3';

export class Separator extends astalify(Gtk.Separator) {
  static {
    GObject.registerClass(this);
  }

  constructor(
    props: ConstructProps<
      Separator,
      Gtk.Separator.ConstructorProps & { transparent: boolean }
    >,
  ) {
    super(props as never);

    if (props.transparent) {
      this.set_class_name('transparent');
    }
  }
}
