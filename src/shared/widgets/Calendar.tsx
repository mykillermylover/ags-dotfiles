import { GObject } from 'astal';
import { astalify, ConstructProps, Gtk } from 'astal/gtk3';

export class Calendar extends astalify(Gtk.Calendar) {
  static {
    GObject.registerClass(this);
  }

  constructor(props: ConstructProps<Calendar, Gtk.Calendar.ConstructorProps>) {
    super(props as never);
  }
}
