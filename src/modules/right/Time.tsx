import { systemTime } from '@shared';

export function Time() {
  return (
    <label>
      {systemTime(time => time.format('%H:%M 󰸗'))}
    </label>
  );
}
