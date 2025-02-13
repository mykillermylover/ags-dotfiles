import { Calendar, Dropdown } from 'shared/components';

export function CalendarMenu() {
  return (
    <Dropdown name={'calendar_dropdown'}>
      <Calendar showDetails={false} expand showDayNames showHeading />
    </Dropdown>
  );
}
