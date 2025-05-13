import { getTemperature } from '@shared/connectables/temperature/helpers.ts';
import { GObject, property, register, Variable } from 'astal';

const initialTemperature = getTemperature();
const POLL_INTERVAL = 5000;

@register({ GTypeName: 'Temperature' })
export class Temperature extends GObject.Object {
  static instance: Temperature;
  static get_default() {
    if (!this.instance) this.instance = new Temperature();

    return this.instance;
  }

  #temperature = initialTemperature;

  @property(Number)
  get temperature() {
    return this.#temperature['Package id 0'].temp1_input ?? 0;
  }

  constructor() {
    super();

    Variable(initialTemperature)
      .poll(POLL_INTERVAL, getTemperature)
      .subscribe((value) => {
        this.#temperature = value;
        this.notify('temperature');
      });
  }
}
