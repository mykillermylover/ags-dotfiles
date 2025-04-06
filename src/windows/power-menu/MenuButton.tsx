import { closePopup } from '@shared/globals';
import { icons } from '@shared/icons';
import { delay } from '@shared/utils';
import { execAsync } from 'astal';
import { ButtonProps } from 'astal/gtk3/widget';

import { POWER_MENU_WINDOW } from '../power-menu';

type PowerMenuItem = 'Shutdown' | 'Reboot' | 'Sleep' | 'Logout';

interface Props {
  itemName: PowerMenuItem;
}

export function PowerMenuButton({ itemName, ...props }: Props & ButtonProps) {
  const powermenu = icons.powermenu as Record<Lowercase<PowerMenuItem>, string>;

  const handleMenuClick = (text: PowerMenuItem) => {
    let command = '';
    switch (text) {
      case 'Shutdown': {
        command = 'systemctl poweroff;';
        break;
      }
      case 'Reboot': {
        command = 'systemctl reboot;';
        break;
      }
      case 'Sleep': {
        command = 'systemctl suspend;';
        break;
      }
      case 'Logout': {
        command = 'hyprctl dispatch exit;';
        break;
      }
    }

    execAsync(`bash -c "sleep 1; ${command}"`)
      .then(async () => delay(1000, () => closePopup(POWER_MENU_WINDOW)))
      .catch(console.error);
  };

  const lowerCaseItem = itemName.toLowerCase() as Lowercase<PowerMenuItem>;
  const icon = powermenu[lowerCaseItem];

  return (
    <box vertical className="power-menu-button" spacing={8}>
      <box className={`container ${lowerCaseItem}`}>
        <button
          cursor="pointer"
          onClick={() => handleMenuClick(itemName)}
          {...props}
        >
          <icon icon={icon} />
        </button>
      </box>
      <label label={itemName} />
    </box>
  );
}
