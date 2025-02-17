import { execAsync, GLib } from 'astal';

export function AppMenu() {
  const callWofi = () => execAsync('bash -c wofi');

  return (
    <button
      className="module-item app-menu"
      onClicked={callWofi}
      cursor="pointer"
    >
      <icon icon={GLib.get_os_info('LOGO') ?? 'missing-symbolic'} />
    </button>
  );
}
