import { AppMenu } from '@windows/bar/widgets/AppMenu';
import { IdleInhibitor } from '@windows/bar/widgets/idle-inhibitor';
import { ModuleSeparator } from '@windows/bar/widgets/ModuleSeparator';
import { SysInfo } from '@windows/bar/widgets/sys-info';
import { Workspaces } from '@windows/bar/widgets/workspaces';
import { Gdk, Gtk } from 'astal/gtk3';

interface LeftModuleProps {
  gdkMonitor: Gdk.Monitor;
}

export function LeftModule({ gdkMonitor }: LeftModuleProps) {
  return (
    <box
      hexpand
      halign={Gtk.Align.START}
      className="container module left-module"
    >
      <AppMenu />

      <SysInfo />

      <ModuleSeparator />
      <Workspaces monitorModel={gdkMonitor.model} />
      <ModuleSeparator />

      <IdleInhibitor />
    </box>
  );
}
