import { Workspaces } from './workspaces/Workspaces';
import { Gdk } from 'astal/gtk3';

export function CenterModule(props: { monitor: Gdk.Monitor }) {
  const { monitor } = props;

  return (
    <Workspaces
      monitorModel={monitor.model}
    />
  );
}
