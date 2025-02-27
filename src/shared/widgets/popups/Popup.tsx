import { globalPopupEventBoxes } from '@shared/globals';
import { App, Astal, Gdk, Gtk } from 'astal/gtk3';
import { BoxProps, EventBox } from 'astal/gtk3/widget';

import { PopupHelpers } from './helpers';

interface PopupProps {
  name: string;
  position?: [x: number, y: number] | [x: number];
  windowKeyPressHandler?: (key: number) => void;
}

export function Popup({
  name,
  position,
  windowKeyPressHandler,
  ...props
}: PopupProps & BoxProps) {
  const { TOP, LEFT, RIGHT, BOTTOM } = Astal.WindowAnchor;
  const [hAlign, vAlign] = position ?? [];

  const { hide, hideOnClick, ignoreOnCLick } = new PopupHelpers(name);

  const eventBoxSetup = (self: EventBox) => {
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
  };

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
          hide();
        }

        windowKeyPressHandler?.(key);
      }}
    >
      <eventbox onButtonPressEvent={hideOnClick}>
        <eventbox
          halign={hAlign ?? Gtk.Align.START}
          valign={vAlign ?? Gtk.Align.START}
          setup={eventBoxSetup}
          onButtonPressEvent={ignoreOnCLick}
        >
          <box
            setup={(self) => {
              // To avoid conflicts with user classes
              self.toggleClassName('container');
            }}
            {...props}
          />
        </eventbox>
      </eventbox>
    </window>
  );
}
