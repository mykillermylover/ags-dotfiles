import { GLib, GObject, monitorFile, property, readFileAsync, register } from 'astal';

const temperaturePath = '/sys/class/thermal/thermal_zone0/temp';

const tempInfoBytes = GLib.file_get_contents(temperaturePath)[1];
const initialTemperature = Number(new TextDecoder('utf8').decode(tempInfoBytes)) / 1000 || 0;

@register({ GTypeName: 'Temperature' })
export default class Temperature extends GObject.Object {
  static instance: Temperature;
  static get_default() {
    if (!this.instance)
      this.instance = new Temperature();

    return this.instance;
  }

  #temperature = initialTemperature;

  @property(Number)
  get temperature() { return this.#temperature; }

  constructor() {
    super();

    monitorFile(temperaturePath, async (f) => {
      const temp = await readFileAsync(f);
      this.#temperature = Number(temp) / 1000;
      this.notify('temperature');
    });
  }
}
