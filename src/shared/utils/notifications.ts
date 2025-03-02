import { execAsync } from 'astal';

type Urgency = 'low' | 'normal' | 'critical';
export interface NotificationArgs {
  appName?: string;
  body?: string;
  iconName?: string;
  id?: number;
  summary?: string;
  urgency?: Urgency;
  category?: string;
  timeout?: number;
  transient?: boolean;
}
export function notify(notifyPayload: NotificationArgs): void {
  let command = 'notify-send';
  command += ` "${notifyPayload.summary} "`;
  if (notifyPayload.body) command += ` "${notifyPayload.body}" `;
  if (notifyPayload.appName) command += ` -a "${notifyPayload.appName}"`;
  if (notifyPayload.iconName) command += ` -i "${notifyPayload.iconName}"`;
  if (notifyPayload.urgency) command += ` -u "${notifyPayload.urgency}"`;
  if (notifyPayload.timeout !== undefined) command += ` -t ${notifyPayload.timeout}`;
  if (notifyPayload.category) command += ` -c "${notifyPayload.category}"`;
  if (notifyPayload.transient) command += ` -e`;
  if (notifyPayload.id !== undefined) command += ` -r ${notifyPayload.id}`;

  execAsync(command)
    .then()
    .catch((error: Error) => {
      console.error(`Failed to send notification: ${error.message}`);
    });
}
