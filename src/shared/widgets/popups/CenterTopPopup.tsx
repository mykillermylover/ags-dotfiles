import { globalPopupEventBoxes } from '@shared/globals';
import { isLeftClick, isRightClick } from '@shared/utils';
import { Variable } from 'astal';
import { App, Astal, Gdk } from 'astal/gtk3';
import { BoxProps } from 'astal/gtk3/widget';

interface CenteredPopupProps {
  name: string;
  child?: JSX.Element | JSX.Element[];
}

export function CenterTopPopup({
  name,
  child,
  ...props
}: CenteredPopupProps & BoxProps) {
  const { TOP, BOTTOM } = Astal.WindowAnchor;

  const width = Variable(0);

  const hideOnClick = (_: unknown, event: Gdk.Event | Astal.ClickEvent) => {
    if (isLeftClick(event) || isRightClick(event)) {
      hide();
    }
  };

  const hide = () => App.get_window(name)?.set_visible(false);

  return (
    <window
      name={name}
      namespace={name}
      exclusivity={Astal.Exclusivity.IGNORE}
      application={App}
      visible={false}
      keymode={Astal.Keymode.ON_DEMAND}
      layer={Astal.Layer.TOP}
      anchor={TOP | BOTTOM}
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
      <box>
        <eventbox widthRequest={width()} onClick={hideOnClick} />

        <eventbox onClick={hideOnClick}>
          <box vertical>
            <eventbox
              setup={(self) => {
                globalPopupEventBoxes.set({
                  ...globalPopupEventBoxes.get(),
                  [name]: self,
                });
                self.toggleClassName('halign');
              }}
              onButtonPressEvent={(_, event) => {
                if (isLeftClick(event) || isRightClick(event)) {
                  return true;
                }
              }}
            >
              <box expand className={'container'} {...props}>
                {child}
              </box>
            </eventbox>

            <eventbox expand />
          </box>
        </eventbox>

        <eventbox widthRequest={width()} onClick={hideOnClick} />
      </box>
    </window>
  );
}
