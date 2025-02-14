import { Calendar, Popup } from '@shared/components';

export function CalendarMenu() {
  return (
    <Popup name={'calendar_popup'}>
      <Calendar showDetails={false} expand showDayNames showHeading />
    </Popup>
  );
}
