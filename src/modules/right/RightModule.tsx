import { Battery } from '@modules/right/battery/Battery';
import { PowerMenu } from '@modules/right/PowerMenu';
import { SoundControl } from '@modules/right/sound/SoundControl';
import { Time } from '@modules/right/Time';

import { SystemTray } from './sys-tray/SystemTray';

export function RightModule() {
  return (
    <>
      <box className="RightModuleItem">
        <SystemTray />
      </box>

      <box className="RightModuleItem">
        <SoundControl />
      </box>

      <box className="RightModuleItem">
        <Battery />
      </box>

      <box className="RightModuleItem">
        <Time />
      </box>

      <box className="RightModuleItem">
        <PowerMenu />
      </box>
    </>
  );
}
