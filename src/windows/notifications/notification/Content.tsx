import { fileExists, isIcon } from '@windows/notifications/helpers';
import { Gtk } from 'astal/gtk3';

import { NotificationProps } from './Notification';

const { START, CENTER } = Gtk.Align;

export function Content({ notification }: NotificationProps) {
  const { image: nImage, summary, body } = notification;

  const image = nImage && fileExists(nImage) ? nImage : null;
  const icon = nImage && isIcon(nImage) ? nImage : null;

  return (
    <box className="content">
      {image && (
        <box
          valign={START}
          className="image"
          css={`
            background-image: url('${image}');
          `}
        />
      )}
      {icon && (
        <box expand={false} valign={START} className="icon-image">
          <icon icon={icon} expand halign={CENTER} valign={CENTER} />
        </box>
      )}
      <box vertical>
        <label
          className="summary"
          halign={START}
          xalign={0}
          useMarkup
          label={summary}
          truncate
        />
        {body && (
          <label
            truncate
            lines={8}
            className="body"
            wrap
            useMarkup
            halign={START}
            xalign={0}
            justifyFill
            label={body}
          />
        )}
      </box>
    </box>
  );
}
