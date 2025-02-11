import { bind, Variable } from 'astal';
import Hyprland from 'gi://AstalHyprland';
import { Workspace } from './Workspace';
import { hyprland } from '@shared';

export function Workspaces(
  props: {
    monitorModel: string;
  },
) {
  const { monitorModel } = props;

  const urgentWorkspaceId: Variable<number> = Variable(Infinity);

  const onWorkspaceFocus = (workspaceId: number, focused: boolean) => {
    if (!focused) return;
    if (urgentWorkspaceId.get() === workspaceId) {
      urgentWorkspaceId.set(Infinity);
    }
  };

  const workspacesCallback = (workspaces: Hyprland.Workspace[]) => workspaces
    .filter(ws => !(ws.id >= -99 && ws.id <= -2))
    .filter(ws => ws.monitor.model === monitorModel)
    .sort((a, b) => a.id - b.id)
    .map(workspace => (
      <Workspace
        workspace={workspace}
        currentUrgent={
          urgentWorkspaceId(workspaceId => workspaceId === workspace.id)
        }
        onFocus={value => onWorkspaceFocus(workspace.id, value)}
      />
    ),
    );

  return (
    <box
      className="Workspaces"

      setup={(self) => {
        self.hook(
          hyprland,
          'urgent',
          (_, client: Hyprland.Client) => urgentWorkspaceId.set(client.workspace.id),
        );
      }}
    >
      {
        bind(hyprland, 'workspaces')
          .as(workspacesCallback)
      }
    </box>
  );
}
