import { hyprDispatchExec } from '@shared/globals';
import { exec, Variable } from 'astal';

const initialState = exec('bash -c "matcha -s"') === 'on';

export function IdleInhibitor() {
  const activated = Variable(initialState);
  const toggleActivated = () => {
    activated.set(!activated.get());
    hyprDispatchExec('matcha -t');
  };

  const getStateText = (activatedText: string, deactivatedText: string) =>
    activated((activated) => (activated ? activatedText : deactivatedText));

  return (
    <button
      cursor="pointer"
      className="IdleInhibitor"
      setup={(self) => {
        self.toggleClassName('activated', activated.get());
        self.hook(activated, () =>
          self.toggleClassName('activated', activated.get()),
        );
      }}
      tooltipMarkup={getStateText('activated', 'deactivated')}
      label={getStateText('󰅶 ', '󰾪 ')}
      onClicked={toggleActivated}
    />
  );
}
