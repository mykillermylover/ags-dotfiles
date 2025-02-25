import { focusedMonitorId } from '@shared/globals';
import { Variable } from 'astal';
import { Astal } from 'astal/gtk3';

import { OnScreenProgress } from './OnScreenProgress';

const { BOTTOM } = Astal.WindowAnchor;
const WINDOW_NAME = 'osd';

export function OSD() {
  const visible = Variable(false);

  return (
    <window
      monitor={focusedMonitorId}
      visible={visible()}
      name={WINDOW_NAME}
      namespace={WINDOW_NAME}
      layer={Astal.Layer.OVERLAY}
      anchor={BOTTOM}
      exclusivity={Astal.Exclusivity.NORMAL}
      keymode={Astal.Keymode.NONE}
    >
      <eventbox onClick={() => visible.set(false)}>
        <OnScreenProgress visible={visible} />
      </eventbox>
    </window>
  );
}
