import { Calendar, Popup } from '@shared/widgets';
import { Gtk } from 'astal/gtk3';

export function CalendarPopup() {
  return (
    <Popup position={[Gtk.Align.CENTER]} name={'calendar'}>
      <Calendar
        className="calendar"
        showDetails={false}
        expand
        showDayNames
        showHeading
      />
    </Popup>
  );
}
