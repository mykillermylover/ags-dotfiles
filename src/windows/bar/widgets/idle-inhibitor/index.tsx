import { idleInhibit, toggleInhibit } from '@shared/globals';

export function IdleInhibitor() {
  const getStateText = (activatedText: string, deactivatedText: string) =>
    idleInhibit((activated) => (activated ? activatedText : deactivatedText));

  return (
    <button
      cursor="pointer"
      className="idle-inhibitor module-item txt-icon"
      setup={(self) => {
        self.toggleClassName('activated', idleInhibit.get());
        self.hook(idleInhibit, () =>
          self.toggleClassName('activated', idleInhibit.get()),
        );
      }}
      tooltipMarkup={getStateText(
        'Inhibitor activated',
        'Inhibitor deactivated',
      )}
      label={getStateText('󰅶', '󰾪')}
      onClicked={toggleInhibit}
    />
  );
}
