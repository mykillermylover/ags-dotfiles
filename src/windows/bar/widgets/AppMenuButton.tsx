import { execAsync, GLib } from 'astal';

const getLogo = (): string => {
  const icons: Record<string, string> = {
    NixOS: `${SRC}/assets/nix-snowflake-colored.svg`,
  };

  const systemName = GLib.get_os_info('NAME') ?? '';

  return icons[systemName] ?? GLib.get_os_info('LOGO') ?? 'missing-symbolic';
};

export function AppMenuButton() {
  const callRofi = () => execAsync('bash -c "rofi -show drun"');

  return (
    <button
      className="module-item app-menu-button"
      onClicked={callRofi}
      cursor="pointer"
    >
      <icon icon={getLogo()} />
    </button>
  );
}
