import { execAsync, GLib } from 'astal';

export function AppMenuButton() {
  const callRofi = () => execAsync('bash -c "rofi -show drun"');

  return (
    <button
      className="module-item app-menu-button"
      onClicked={callRofi}
      cursor="pointer"
    >
      <icon icon={GLib.get_os_info('LOGO') ?? 'missing-symbolic'} />
    </button>
  );
}
