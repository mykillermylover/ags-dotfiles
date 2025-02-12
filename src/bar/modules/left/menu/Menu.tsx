import { execAsync, GLib } from 'astal';

export function Menu() {
  const callWofi = () => execAsync('bash -c wofi');

  return (
    <button className="Menu" onClicked={callWofi} cursor="pointer">
      <icon icon={GLib.get_os_info('LOGO') ?? 'missing-symbolic'} />
    </button>
  );
}
