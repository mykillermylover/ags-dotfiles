import { NotificationProps } from './Notification';

export function Actions({ notification }: NotificationProps) {
  const actions = notification.get_actions();

  if (actions.length === 0) {
    return <></>;
  }

  return (
    <box className="actions">
      {actions.map(({ label, id }) => (
        <button
          cursor="pointer"
          className="secondary"
          hexpand
          onClicked={() => notification.invoke(id)}
          label={label}
        />
      ))}
    </box>
  );
}
