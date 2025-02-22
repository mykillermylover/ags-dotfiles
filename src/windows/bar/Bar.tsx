import { idleInhibit } from '@shared/globals';
import { App, Astal, Gdk } from 'astal/gtk3';

import { CenterModule } from './CenterModule';
import { LeftModule } from './LeftModule';
import { RightModule } from './RightModule';

const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;

export default function Bar(gdkMonitor: Gdk.Monitor) {
  return (
    <window
      inhibit={idleInhibit()}
      className="Bar"
      gdkmonitor={gdkMonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      application={App}
    >
      <centerbox className="bar-container" heightRequest={0}>
        <LeftModule gdkMonitor={gdkMonitor} />

        <CenterModule />

        <RightModule />
      </centerbox>
    </window>
  );
}
