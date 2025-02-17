import { Binding, GObject } from 'astal';
import { astalify, ConstructProps, Gtk } from 'astal/gtk3';

export class RadioButton extends astalify(Gtk.RadioButton) {
  static {
    GObject.registerClass(this);
  }
  static newGroup() {
    return this.new_from_widget(new RadioButton());
  }

  constructor(
    props?: ConstructProps<
      RadioButton,
      Gtk.RadioButton.ConstructorProps,
      { onToggled: [] }
    >,
  ) {
    super(props as never);

    this.setActive(props?.active);
  }

  setActive(is_active: boolean | Binding<boolean | undefined> | undefined) {
    if (is_active instanceof Binding) {
      is_active = is_active.get();
    }
    if (!is_active) {
      is_active = false;
    }
    this.set_active(is_active);
  }
}
