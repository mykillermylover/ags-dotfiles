import Hyprland from 'gi://AstalHyprland';
import { hyprland } from '@shared';
import { bind, Binding, Variable } from 'astal';

export function Workspace(props:
{
  workspace: Hyprland.Workspace;
  onFocus?: (value: boolean) => void;
  currentUrgent?: Binding<boolean>;
}) {
  const {
    onFocus = () => null,
    workspace,
    currentUrgent = Variable(false),
  } = props;

  const currentFocused = bind(hyprland, 'focusedWorkspace')
    .as(focusedWorkspace =>
      focusedWorkspace.id === workspace.id,
    );

  currentFocused.subscribe(onFocus);

  const markUrgent = Variable.derive([currentUrgent, currentFocused], (urgent, focused) => urgent && !focused);

  return (
    <button
      className="WorkspaceButton"
      setup={(self) => {
        self.toggleClassName('urgent', markUrgent.get());
        self.hook(
          markUrgent,
          () => self.toggleClassName('urgent', markUrgent.get()),
        );

        self.toggleClassName('focused', currentFocused.get());
        self.hook(
          currentFocused,
          () => self.toggleClassName('focused', currentFocused.get()),
        );
      }}

      onClicked={() => workspace.focus()}
    >
      {workspace.id}
    </button>
  );
}
