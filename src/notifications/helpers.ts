import { execAsync, GLib } from 'astal';
import { Astal } from 'astal/gtk3';
import AstalNotifd from 'gi://AstalNotifd';

export const TELEGRAM_NAME = 'org.telegram.com';

export function getUrgency({ urgency }: AstalNotifd.Notification) {
  const { LOW, CRITICAL } = AstalNotifd.Urgency;

  switch (urgency) {
    case LOW: {
      return 'low';
    }
    case CRITICAL: {
      return 'critical';
    }
  }

  return 'normal';
}

export function getTime(time: number, format = '%H:%M:%S') {
  return GLib.DateTime.new_from_unix_local(time).format(format)!;
}

export function fileExists(path: string) {
  return GLib.file_test(path, GLib.FileTest.EXISTS);
}

export function isIcon(icon: string) {
  return Boolean(Astal.Icon.lookup_icon(icon));
}

export async function playAudioFile(path: string) {
  if (path) {
    await execAsync(['aplay', path]);
  }
}
