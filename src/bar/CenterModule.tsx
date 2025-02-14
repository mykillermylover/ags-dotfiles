import { Gdk } from 'astal/gtk3';

import { Workspaces } from './components/workspaces/Workspaces';

export function CenterModule(props: { monitor: Gdk.Monitor }) {
  const { monitor } = props;

  return (
    <box>
      <Workspaces monitorModel={monitor.model} />
    </box>
  );
}
