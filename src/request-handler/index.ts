import { hyprDispatchExec } from '@shared/globals';

export function requestHandler(
  request: string,
  res: (response: unknown) => void,
): void {
  try {
    switch (request) {
      case 'restart': {
        restartApp();
      }
    }

    res(`${request} OK`);
  } catch (error_) {
    const error = error_ as Error;

    res(`${request} ERROR: ${error?.message}`);
  }
}

export const restartApp = () => hyprDispatchExec('killall mshell; mshell');
