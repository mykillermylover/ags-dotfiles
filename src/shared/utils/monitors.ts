import { delay } from '@shared/utils/helpers.ts';
import Bar from '@windows/bar/Bar.tsx';
import { App } from 'astal/gtk3';
import AstalHyprland from 'gi://AstalHyprland';

export const addBar = (hyprlandMonitor: AstalHyprland.Monitor) => {
  const monitor = App.get_monitors().find(
    (gdkMonitor) => gdkMonitor.model === hyprlandMonitor.model,
  );
  if (!monitor) throw new Error('Missing monitor');

  Bar(monitor);
};

export const tryRender = async (
  hyprlandMonitor: AstalHyprland.Monitor,
  times = 3,
  delayMs = 300,
) => {
  for (let i = 0; i < times; i++) {
    try {
      addBar(hyprlandMonitor);
      return;
    } catch {
      await delay(delayMs);
    }
  }
};
