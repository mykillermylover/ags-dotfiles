import { networkService } from '@shared/globals';
import { bind, Binding } from 'astal';
import { Gtk } from 'astal/gtk3';

interface Props {
  currentPage: string | Binding<string>;
  revealChild: boolean | Binding<boolean>;
}

export function WifiBTMenu({ currentPage, revealChild }: Props) {
  const wifi = networkService.wifi;

  return (
    <revealer revealChild={revealChild}>
      <stack
        visibleChildName={currentPage}
        transitionType={Gtk.StackTransitionType.SLIDE_LEFT_RIGHT}
      >
        <scrollable name="wifi" heightRequest={120}>
          <box vertical>
            {bind(wifi, 'accessPoints').as((accessPoints) =>
              accessPoints.map((accessPoint) => (
                <box>
                  <icon icon={accessPoint.iconName} />
                  <label>{accessPoint.ssid}</label>

                  <label hexpand xalign={1}>
                    {`${(accessPoint.frequency / 1000).toFixed(1)} GHz`}
                  </label>
                </box>
              )),
            )}
          </box>
        </scrollable>
        <box name="bluetooth">
          <label>BLUETOOTH</label>
        </box>
      </stack>
    </revealer>
  );
}
