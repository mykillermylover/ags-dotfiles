import { networkService } from '@shared/globals';
import { notify } from '@shared/utils';
import { bind, execAsync } from 'astal';
import Network from 'gi://AstalNetwork';

export function WifiPage() {
  const wifi = networkService.wifi;
  const accessPointClassName = (accessPoint: Network.AccessPoint) => {
    const className = 'qs-list-item';

    return bind(wifi, 'activeAccessPoint').as((activeAccessPoint) =>
      accessPoint === activeAccessPoint ? `${className} active` : className,
    );
  };

  const connectToAccessPoint = async ({ bssid }: Network.AccessPoint) => {
    const currentAccessPoint = wifi.get_active_access_point();
    try {
      await execAsync(`nmcli device wifi connect ${bssid}`);
    } catch (error) {
      const message = (error as Error).message;

      if (message) {
        if (
          message
            .toLowerCase()
            .includes('secrets were required, but not provided') &&
          currentAccessPoint
        ) {
          await connectToAccessPoint(currentAccessPoint);
        }
        notify({ summary: 'Network', body: message });
      }
    }
  };

  return (
    <scrollable
      className="wifi-list-scrollable"
      name="wifi"
      heightRequest={160}
    >
      <box vertical className="wifi-list" spacing={2}>
        {bind(wifi, 'accessPoints').as((accessPoints) =>
          accessPoints
            .sort((a, b) => b.strength - a.strength)
            .map((accessPoint) => (
              <button
                onClick={() => connectToAccessPoint(accessPoint)}
                cursor="pointer"
                className={accessPointClassName(accessPoint)}
              >
                <box>
                  <icon icon={accessPoint.iconName} />
                  <label>{accessPoint.ssid}</label>

                  <label hexpand xalign={1}>
                    {`${(accessPoint.frequency / 1000).toFixed(1)} GHz`}
                  </label>
                </box>
              </button>
            )),
        )}
      </box>
    </scrollable>
  );
}
