import { hyprland } from '@shared/globals';
import { bind, Binding, Variable } from 'astal';
import Hyprland from 'gi://AstalHyprland';

export function Workspace(props: {
  workspace: Hyprland.Workspace;
  onFocus?: (value: boolean) => void;
  currentUrgent?: Binding<boolean>;
}) {
  const {
    onFocus = () => null,
    workspace,
    currentUrgent = Variable(false),
  } = props;

  const currentFocused = bind(hyprland, 'focusedWorkspace').as(
    (focusedWorkspace) => focusedWorkspace.id === workspace.id,
  );

  currentFocused.subscribe(onFocus);

  return (
    <button
      cursor="pointer"
      onClick={() => workspace.focus()}
      className="workspace-button"
      setup={(self) => {
        const toggleClassNameHook = (
          className: string,
          condition: Binding<boolean> | Variable<boolean>,
        ) => {
          self.toggleClassName(className, condition.get());
          self.hook(condition, () =>
            self.toggleClassName(className, condition.get()),
          );
        };

        toggleClassNameHook('urgent', currentUrgent);
        toggleClassNameHook('focused', currentFocused);
      }}
    >
      <label className="animating">{workspace.id}</label>
    </button>
  );
}
