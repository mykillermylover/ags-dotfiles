import { globalPopupEventBoxes } from '@shared/globals';
import { App, Astal, Gdk, Gtk } from 'astal/gtk3';
import { BoxProps } from 'astal/gtk3/widget';

interface PopupProps {
  name: string;
  child?: JSX.Element | JSX.Element[];
  position?: [x: number, y: number] | [x: number];
}

export function Popup({
  name,
  child,
  position,
  ...props
}: PopupProps & BoxProps) {
  const { TOP, LEFT, RIGHT, BOTTOM } = Astal.WindowAnchor;
  const [hAlign, vAlign] = position ?? [];

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
          halign={hAlign ?? Gtk.Align.START}
          valign={vAlign ?? Gtk.Align.START}
          setup={(self) => {
            globalPopupEventBoxes.set({
              ...globalPopupEventBoxes.get(),
              [name]: self,
            });
            if (Number.isInteger(vAlign)) {
              self.toggleClassName('valign');
            }
            if (Number.isInteger(hAlign)) {
              self.toggleClassName('halign');
            }
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
            revealChild={false}
            setup={(self) => {
              App.connect('window-toggled', (_, window) => {
                self.set_reveal_child(window.visible);
              });
            }}
            transitionType={Gtk.RevealerTransitionType.SLIDE_UP}
            transitionDuration={150}
          >
            <box canFocus className={'container'} {...props}>
              {child}
            </box>
          </revealer>
        </eventbox>
      </eventbox>
    </window>
  );
}
