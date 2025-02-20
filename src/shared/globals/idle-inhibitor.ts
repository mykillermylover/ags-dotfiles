import { Variable } from 'astal';

export const idleInhibit = Variable(false);

export function toggleInhibit() {
  idleInhibit.set(!idleInhibit.get());
}
