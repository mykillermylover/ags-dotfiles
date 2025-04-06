import { FlowBox } from '@shared/widgets';
import { AnchoredPopup } from '@shared/widgets/popups/anchored-popup';

import { PowerMenuButton } from './MenuButton';

export const POWER_MENU_WINDOW = 'power-menu';
export function PowerMenu() {
  return (
    <AnchoredPopup
      container={false}
      className="power-menu"
      backdrop
      name={POWER_MENU_WINDOW}
    >
      <FlowBox minChildrenPerLine={2} maxChildrenPerLine={2}>
        <PowerMenuButton itemName="Shutdown" />

        <PowerMenuButton itemName="Reboot" />

        <PowerMenuButton itemName="Sleep" />

        <PowerMenuButton itemName="Logout" />
      </FlowBox>
    </AnchoredPopup>
  );
}
