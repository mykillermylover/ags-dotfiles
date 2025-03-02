import { Binding, Variable } from 'astal';
import { Gtk } from 'astal/gtk3';

import { WifiPage } from './pages/Wifi';

interface Props {
  currentPage: Binding<string>;
  revealChild: Binding<boolean>;
}

export function WifiBTMenu({ currentPage, revealChild }: Props) {
  const className = Variable.derive(
    [currentPage, revealChild],
    (currentPage, revealChild) => {
      const defaultName = 'wifi-bt-stack';
      if (!revealChild) {
        return defaultName;
      }

      return `${defaultName} ${currentPage}`;
    },
  );

  return (
    <revealer
      onDestroy={() => {
        className.drop();
      }}
      revealChild={revealChild}
    >
      <box className={className()}>
        <stack
          visibleChildName={currentPage}
          transitionType={Gtk.StackTransitionType.SLIDE_LEFT_RIGHT}
        >
          <WifiPage />

          <box name="bluetooth">
            <label>BLUETOOTH</label>
          </box>
        </stack>
      </box>
    </revealer>
  );
}
