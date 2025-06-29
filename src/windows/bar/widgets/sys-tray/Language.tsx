import { hyprlandService } from '@shared/globals';
import { exec, Variable } from 'astal';

const initialLayout = exec(
  `bash -c '${SRC}/scripts/keyboard-layout.sh'`,
);
const activeKeyboard = exec(`bash -c 'hyprctl devices -j | 
  jq -r ".keyboards | map(select(.main)) | .[0] | .name"'`);

export function Language() {
  const layout = Variable(initialLayout);

  const languageIcon = layout((name) => {
    switch (name) {
      case 'en': {
        return '🇺🇸';
      }
      case 'ru': {
        return '🇷🇺';
      }
      default: {
        return name;
      }
    }
  });

  return (
    <button
      className="sys-tray-item"
      tooltipMarkup={layout((name) => name.toUpperCase())}
      label={languageIcon}
      setup={(self) => {
        self.hook(
          hyprlandService,
          'keyboard-layout',
          (_, __, layoutName: string) =>
            layout.set(layoutName.slice(0, 2).toLowerCase()),
        );
      }}
      onClicked={() =>
        exec(`bash -c "hyprctl switchxkblayout ${activeKeyboard} next"`)
      }
    />
  );
}
