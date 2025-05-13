import {
  CPUTemperature,
  CPUTempWithAdapter,
} from '@shared/connectables/temperature/interfaces.ts';
import { exec } from 'astal';

const getTempCommand = `bash -c "sensors -j | jq '.[\\"coretemp-isa-0000\\"]'"`;
export const getTemperature = (): CPUTemperature => {
  const result = JSON.parse(exec(getTempCommand)) as CPUTempWithAdapter;
  delete result.Adapter;

  return result;
};
