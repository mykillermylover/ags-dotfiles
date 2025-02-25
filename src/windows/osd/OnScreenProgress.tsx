import { BrightnessService } from '@shared/connectables';
import { audioService } from '@shared/globals';
import { icons } from '@shared/icons';
import { timeout, Variable } from 'astal';
import { Revealer } from 'astal/gtk3/widget';

interface Props {
  visible: Variable<boolean>;
}

const { screen: screenIcon } = icons.brightness;
const TIMEOUT = 2000;

export function OnScreenProgress({ visible }: Props) {
  const brightness = BrightnessService.get_default();
  const speaker = audioService.defaultSpeaker;

  const icon = Variable('');
  const value = Variable(0);
  const maxValue = icon((i) => (i === screenIcon ? 1 : 1.5));

  let displayCount = 0;

  const hide = () => {
    displayCount--;

    if (displayCount === 0) {
      visible.set(false);
    }
  };

  const show = (v: number, i: string) => {
    visible.set(true);
    value.set(v);
    icon.set(i);

    displayCount++;

    timeout(TIMEOUT, hide);
  };

  const setup = (self: Revealer) => {
    self.hook(brightness, 'notify::screen', () =>
      show(brightness.screen, screenIcon),
    );

    self.hook(speaker, 'notify::volume', () =>
      show(speaker.volume, speaker.volumeIcon),
    );
  };

  return (
    <revealer revealChild={visible()} setup={setup}>
      <box className="OSD">
        <icon icon={icon()} />
        <levelbar maxValue={maxValue} widthRequest={100} value={value()} />
        <label label={value((v) => `${Math.round(v * 100)}%`)} />
      </box>
    </revealer>
  );
}
