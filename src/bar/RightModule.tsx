import { Battery } from './components/battery/Battery';
import { PowerMenu } from './components/PowerMenu';
import { AudioControl } from './components/sound/AudioControl';
import { SystemTray } from './components/sys-tray/SystemTray';
import { Time } from './components/Time';

export function RightModule() {
  return (
    <>
      <box className="right-module-item">
        <SystemTray />
      </box>

      <box className="right-module-item">
        <AudioControl />
      </box>

      <box className="right-module-item">
        <Battery />
      </box>

      <box className="right-module-item">
        <Time />
      </box>

      <box className="right-module-item">
        <PowerMenu />
      </box>
    </>
  );
}
