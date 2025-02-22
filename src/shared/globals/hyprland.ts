import Hyprland from 'gi://AstalHyprland';

export const hyprlandService = Hyprland.get_default();

export const hyprDispatch = (dispatcher: string, args: string) =>
  hyprlandService.dispatch(dispatcher, args);

export const hyprDispatchExec = (args: string) => hyprDispatch('exec', args);
