import { execAsync, GLib } from 'astal';
import { Astal } from 'astal/gtk3';
import AstalNotifd from 'gi://AstalNotifd';

export const TELEGRAM_NAMES = ['org.telegram.com', 'org.telegram.desktop'];

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

// Some icons incorrect
export function processAppIcon(icon: string) {
  if (!icon) {
    return;
  }

  for (const TG_NAME of TELEGRAM_NAMES) {
    if (icon.includes(TG_NAME)) {
      return TG_NAME;
    }
  }

  if (icon?.includes('network-manager-applet')) {
    return 'network-cellular-symbolic';
  }
}
