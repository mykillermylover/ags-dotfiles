import { Gdk } from 'astal/gtk3';

import { Workspaces } from './workspaces/Workspaces';

export function CenterModule(props: { monitor: Gdk.Monitor }) {
  const { monitor } = props;

  return <Workspaces monitorModel={monitor.model} />;
}
