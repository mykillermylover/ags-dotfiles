import { globalPopupEventBoxes } from '@shared/globals';
import { Variable } from 'astal';
import { App, Astal, Gdk } from 'astal/gtk3';
import { BoxProps } from 'astal/gtk3/widget';

import { PopupHelpers } from '../helpers';
import { PopupProps } from './interfaces';
import { Layout } from './Layout';

export function AnchoredPopup({
  name,
  position,
  backdrop,
  container = true,
  ...props
}: PopupProps & BoxProps) {
  const { TOP, BOTTOM, LEFT, RIGHT } = Astal.WindowAnchor;
  const { hide, hideOnClick, ignoreOnCLick } = new PopupHelpers(name);

  const width = Variable(0);

  return (
    <window
      name={name}
      namespace={name}
      exclusivity={Astal.Exclusivity.IGNORE}
      application={App}
      visible={false}
      keymode={Astal.Keymode.ON_DEMAND}
      layer={Astal.Layer.TOP}
      anchor={TOP | BOTTOM | RIGHT | LEFT}
      onKeyPressEvent={(_, event) => {
        const key = event.get_keyval()[1];

        if (key === Gdk.KEY_Escape) {
          hide();
        }
      }}
      onNotifyVisible={(self) => {
        // instead of anchoring to all sides we set the width explicitly
        // otherwise label wrapping won't work correctly without setting their width
        if (self.visible) {
          width.set(self.get_current_monitor().workarea.width);
        }
      }}
    >
      <eventbox onClick={hideOnClick} className={backdrop ? 'backdrop' : ''}>
        <Layout position={position}>
          <eventbox
            setup={(self) => {
              globalPopupEventBoxes.set({
                ...globalPopupEventBoxes.get(),
                [name]: self,
              });

              self.toggleClassName('halign');
            }}
            onButtonPressEvent={ignoreOnCLick}
          >
            <box
              setup={(self) => {
                self.toggleClassName('container', container);
              }}
              {...props}
            />
          </eventbox>
        </Layout>
      </eventbox>
    </window>
  );
}
