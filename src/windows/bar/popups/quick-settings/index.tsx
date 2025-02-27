import { Popup } from '@shared/widgets';

import { AudioControl } from './audio';
import { WifiBT } from './wifi-bt';

export function QuickSettings() {
  return (
    <Popup name="quick-settings" className="quick-settings" vertical>
      <WifiBT />

      <AudioControl />
    </Popup>
  );
}
