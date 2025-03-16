import { Binding, Variable } from 'astal';
import { Gtk } from 'astal/gtk3';

import { BluetoothPage } from './pages/bluetooth';
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
          heightRequest={320}
          visibleChildName={currentPage}
          transitionType={Gtk.StackTransitionType.SLIDE_LEFT_RIGHT}
        >
          <WifiPage />

          <BluetoothPage />
        </stack>
      </box>
    </revealer>
  );
}
