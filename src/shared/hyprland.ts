import Hyprland from 'gi://AstalHyprland';

export const hyprland = Hyprland.get_default();

export const hyprDispatch = (dispatcher: string, args: string) =>
  hyprland.dispatch(dispatcher, args);

export const hyprDispatchExec = (args: string) => hyprDispatch('exec', args);
