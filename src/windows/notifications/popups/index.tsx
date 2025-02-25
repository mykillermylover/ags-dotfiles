import { focusedMonitorId } from '@shared/globals';
import { bind, Variable } from 'astal';
import { Astal } from 'astal/gtk3';
import { Window } from 'astal/gtk3/widget';

import { NotificationsMap } from '../helpers/notifications-map';

const { TOP, RIGHT } = Astal.WindowAnchor;
const WINDOW_NAME = 'notification-popup';

export function NotificationsPopups() {
  const window = Variable<Window | undefined>(undefined);

  const notifications = new NotificationsMap({ window });

  return (
    <window
      onDestroy={() => {
        window.drop();
      }}
      visible={false}
      widthRequest={400}
      name={WINDOW_NAME}
      namespace={WINDOW_NAME}
      layer={Astal.Layer.OVERLAY}
      anchor={RIGHT | TOP}
      exclusivity={Astal.Exclusivity.NORMAL}
      monitor={focusedMonitorId}
      setup={(self) => {
        window.set(self);
      }}
      keymode={Astal.Keymode.NONE}
    >
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
      /* @ts-expect-error*/}
      <box vertical noImplicitDestroy>
        {bind(notifications).as((list) => list.slice(0, 5))}
      </box>
    </window>
  );
}
