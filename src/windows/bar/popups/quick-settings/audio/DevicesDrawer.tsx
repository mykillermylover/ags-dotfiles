import { Binding, Variable } from 'astal';
import { App } from 'astal/gtk3';
import AstalWp from 'gi://AstalWp';
import Wp from 'gi://AstalWp';

import { DefaultDevice } from './DefaultDevice';
import { Devices } from './Devices';

interface Props {
  defaultDevice: AstalWp.Endpoint;
  devices: Binding<Wp.Endpoint[]>;
}
export function DevicesDrawer({ defaultDevice, devices }: Props) {
  const arrowState = Variable(false);
  const toggleState = () => {
    arrowState.set(!arrowState.get());
  };

  App.connect('window-toggled', (_, window) => {
    if (window.name === 'quick-settings' && !window.visible) {
      arrowState.set(false);
    }
  });

  const className = arrowState((v) => {
    const defaultName = 'devices-drawer';

    return v ? `${defaultName} active` : defaultName;
  });

  return (
    <box vertical className={className}>
      <DefaultDevice
        onClick={toggleState}
        device={defaultDevice}
        arrowState={arrowState()}
      />
      <revealer className="devices-list-container" revealChild={arrowState()}>
        <Devices devices={devices} />
      </revealer>
    </box>
  );
}
