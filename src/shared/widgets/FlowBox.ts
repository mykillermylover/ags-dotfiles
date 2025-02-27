import { GObject } from 'astal';
import { astalify, ConstructProps, Gtk } from 'astal/gtk3';

export class FlowBox extends astalify(Gtk.FlowBox) {
  static {
    GObject.registerClass(this);
  }

  constructor(props: ConstructProps<FlowBox, Gtk.FlowBox.ConstructorProps>) {
    super(props as never);
  }
}
