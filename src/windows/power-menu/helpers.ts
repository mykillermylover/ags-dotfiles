export type PowerMenuItem = 'Shutdown' | 'Reboot' | 'Sleep' | 'Logout';

export const createCommand = (text: PowerMenuItem) => {
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

  return `bash -c "sleep 0.5; ${command}"`;
};
