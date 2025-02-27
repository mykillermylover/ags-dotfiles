import { icons } from '@shared/icons';
import { Binding } from 'astal';
import { Gtk } from 'astal/gtk3';

interface Props {
  icon: string | Binding<string>;
  title: string | Binding<string>;
  subtitle: string | Binding<string>;

  onButtonClick?: () => void;
  onArrowClick?: () => void;
}

export function ArrowButton({
  icon,
  title,
  onArrowClick,
  onButtonClick,
  subtitle,
}: Props) {
  return (
    <box className="arrow-button">
      <eventbox onClick={onButtonClick} cursor="pointer" hexpand>
        <box className="main">
          <icon halign={Gtk.Align.START} className="main-icon" icon={icon} />

          <box vertical>
            <label xalign={0} label={title} />
            <label
              maxWidthChars={15}
              truncate
              tooltipText={subtitle}
              xalign={0}
              label={subtitle}
            />
          </box>
        </box>
      </eventbox>

      <eventbox onClick={onArrowClick} cursor="pointer" halign={Gtk.Align.END}>
        <icon className="arrow-icon" icon={icons.ui.arrow.draw.right} />
      </eventbox>
    </box>
  );
}
