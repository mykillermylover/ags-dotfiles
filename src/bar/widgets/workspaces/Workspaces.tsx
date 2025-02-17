import { hyprland } from '@shared/globals';
import { bind, Variable } from 'astal';
import Hyprland from 'gi://AstalHyprland';

import { Workspace } from './Workspace';

export function Workspaces(props: { monitorModel: string }) {
  const { monitorModel } = props;

  const urgentWorkspaceId = Variable(Infinity);
  const focusedWorkspaceId = Variable(Infinity);

  const onWorkspaceFocus = (workspaceId: number, focused: boolean) => {
    if (!focused) return;

    focusedWorkspaceId.set(workspaceId);
    if (urgentWorkspaceId.get() === workspaceId) {
      urgentWorkspaceId.set(Infinity);
    }
  };

  const workspacesCallback = (workspaces: Hyprland.Workspace[]) =>
    workspaces
      .filter((ws) => !(ws.id >= -99 && ws.id <= -2))
      .filter((ws) => ws.monitor.model === monitorModel)
      .sort((a, b) => a.id - b.id)
      .map((workspace) => (
        <Workspace
          workspace={workspace}
          currentUrgent={urgentWorkspaceId(
            (urgentId) =>
              workspace.id !== focusedWorkspaceId.get() &&
              urgentId === workspace.id,
          )}
          onFocus={(value) => onWorkspaceFocus(workspace.id, value)}
        />
      ));

  return (
    <box
      className="workspaces module-item"
      setup={(self) => {
        self.hook(hyprland, 'urgent', (_, client?: Hyprland.Client) => {
          if (!client) return;
          urgentWorkspaceId.set(client.workspace.id);
        });
      }}
    >
      {bind(hyprland, 'workspaces').as(workspacesCallback)}
    </box>
  );
}
