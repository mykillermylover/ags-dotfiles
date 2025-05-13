type TemperatureType = 'input' | 'max' | 'crit' | 'crit_alarm';

type TempInput = `Package id ${number}` | `Core ${number}`;

export type CPUTemperature = Record<
  TempInput,
  Record<`temp${number}_${TemperatureType}`, number>
>;

export type CPUTempWithAdapter = CPUTemperature & { Adapter?: string };
