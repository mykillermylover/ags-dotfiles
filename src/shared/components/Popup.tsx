import { globalPopupEventBoxes } from '@shared/globals';
import { App, Astal, Gdk, Gtk } from 'astal/gtk3';

interface PopupProps {
  child?: JSX.Element | JSX.Element[];
  name: string;
}

export function Popup({ name, child }: PopupProps) {
  const { TOP, LEFT, RIGHT, BOTTOM } = Astal.WindowAnchor;

  return (
    <window
      name={name}
      namespace={name}
      exclusivity={Astal.Exclusivity.IGNORE}
      application={App}
      visible={false}
      keymode={Astal.Keymode.ON_DEMAND}
      layer={Astal.Layer.TOP}
      anchor={TOP | LEFT | RIGHT | BOTTOM}
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
            globalPopupEventBoxes.set({
              ...globalPopupEventBoxes.get(),
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
