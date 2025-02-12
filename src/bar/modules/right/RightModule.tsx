import { Battery } from '@bar/modules/right/battery/Battery';
import { PowerMenu } from '@bar/modules/right/PowerMenu';
import { SoundControl } from '@bar/modules/right/sound/SoundControl';
import { Time } from '@bar/modules/right/Time';

import { SystemTray } from './sys-tray/SystemTray';

export function RightModule() {
  return (
    <>
      <box className="right-module-item">
        <SystemTray />
      </box>

      <box className="right-module-item">
        <SoundControl />
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
