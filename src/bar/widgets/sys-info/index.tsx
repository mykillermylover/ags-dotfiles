import { execKittyAsync } from '@shared/globals';
import { Variable } from 'astal';
import { Gtk } from 'astal/gtk3';

import { CpuInfo } from './items/CpuInfo';
import { MemoryInfo } from './items/MemoryInfo';
import { TemperatureInfo } from './items/TemperatureInfo';

export function SysInfo() {
  const isVisible = Variable(false);

  const toggleVisible = (value: boolean) => {
    isVisible.set(value);
  };

  return (
    <eventbox
      cursor="pointer"
      onHover={() => toggleVisible(true)}
      onHoverLost={() => toggleVisible(false)}
      onClick={() => execKittyAsync('btop')}
    >
      <box className="sys-info module-item" valign={Gtk.Align.CENTER}>
        <MemoryInfo />

        <revealer
          cursor="pointer"
          setup={(self) =>
            self.hook(isVisible, () => (self.revealChild = isVisible.get()))
          }
          transitionType={Gtk.RevealerTransitionType.SLIDE_LEFT}
        >
          <box>
            <CpuInfo />

            <TemperatureInfo />
          </box>
        </revealer>
      </box>
    </eventbox>
  );
}
