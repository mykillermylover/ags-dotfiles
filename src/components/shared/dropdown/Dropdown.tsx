import { globalDropdownEventBoxes } from '@shared';
import { App, Astal, Gdk, Gtk } from 'astal/gtk3';

import { DropdownProps } from './interfaces.ts';

export function Dropdown({ name, child }: DropdownProps) {
  return (
    <window
      name={name}
      namespace={name}
      exclusivity={Astal.Exclusivity.IGNORE}
      application={App}
      visible={false}
      keymode={Astal.Keymode.ON_DEMAND}
      layer={Astal.Layer.TOP}
      anchor={
        Astal.WindowAnchor.TOP |
        Astal.WindowAnchor.LEFT |
        Astal.WindowAnchor.RIGHT |
        Astal.WindowAnchor.BOTTOM
      }
      css="background-color: transparent"
      onKeyPressEvent={(_, event) => {
        const key = event.get_keyval()[1];

        if (key === Gdk.KEY_Escape) {
          App.get_window(name)?.set_visible(false);
        }
      }}
    >
      <eventbox
        onButtonPressEvent={(_, event) => {
          const buttonClicked = event.get_button()[1];

          if (
            buttonClicked === Gdk.BUTTON_PRIMARY ||
            buttonClicked === Gdk.BUTTON_SECONDARY
          ) {
            App.get_window(name)?.set_visible(false);
          }
        }}
      >
        <eventbox
          halign={Gtk.Align.START}
          valign={Gtk.Align.START}
          setup={(self) => {
            globalDropdownEventBoxes.set({
              ...globalDropdownEventBoxes.get(),
              [name]: self,
            });
          }}
          onButtonPressEvent={(_, event) => {
            const buttonClicked = event.get_button()[1];

            if (
              buttonClicked === Gdk.BUTTON_PRIMARY ||
              buttonClicked === Gdk.BUTTON_SECONDARY
            ) {
              return true;
            }
          }}
        >
          <revealer
            canFocus
            revealChild={false}
            setup={(self) => {
              App.connect('window-toggled', (_, window) => {
                self.set_reveal_child(window.visible);
              });
            }}
            transitionType={Gtk.RevealerTransitionType.SLIDE_UP}
            transitionDuration={150}
          >
            <box vertical>{child}</box>
          </revealer>
        </eventbox>
      </eventbox>
    </window>
  );
}
