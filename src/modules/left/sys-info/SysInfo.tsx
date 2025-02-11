import { Variable } from 'astal';
import { Gtk } from 'astal/gtk3';
import { MemoryInfo } from './items/MemoryInfo';
import { CpuInfo } from './items/CpuInfo';
import { TemperatureInfo } from './items/TemperatureInfo';
import { execKittyAsync } from '@shared/kitty';

export function SysInfo() {
  const isVisible = Variable(false);

  const toggleVisible = (value: boolean) => {
    isVisible.set(value);
  };

  return (
    <eventbox
      className="SysInfo"
      cursor="pointer"

      onHover={() => toggleVisible(true)}
      onHoverLost={() => toggleVisible(false)}

      onClick={() => execKittyAsync('btop')}
    >
      <box>
        <MemoryInfo />

        <revealer
          cursor="pointer"
          setup={self => self.hook(
            isVisible,
            () => self.revealChild = isVisible.get(),
          )}
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
