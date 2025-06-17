import { MediaPlayerService } from '@shared/connectables';
import { PlayerAction } from '@shared/connectables/mediaplayer';
import { execAsync } from 'astal';

export const restartApp = () => execAsync('bash -c "mshell -q; mshell"');

export const playerAction = (action: PlayerAction) => {
  const mediaplayer = MediaPlayerService.get_default();

  mediaplayer[action]();
};

const handlers: Record<string, { description: string; handler: () => void }> = {
  restart: {
    description: 'Restart app',
    handler: restartApp,
  },
  'play-pause': {
    description: 'Start-stop current player',
    handler: () => playerAction('play-pause'),
  },
  previous: {
    description: 'Play prev track on current player',
    handler: () => playerAction('previous'),
  },
  next: {
    description: 'Play next track on current player',
    handler: () => playerAction('next'),
  },
};

const getHelp = () => {
  let result = '';

  for (const [name, { description }] of Object.entries(handlers)) {
    result += `${name.padEnd(15)} -- ${description}\n`;
  }

  return result;
};

export function requestHandler(
  request: string,
  res: (response: unknown) => void,
): void {
  try {
    if (request === 'help') {
      res(getHelp());
    } else {
      handlers[request]?.handler();
    }

    res(`${request} OK`);
  } catch (error_) {
    const error = error_ as Error;

    res(`${request} ERROR: ${error?.message}`);
  }
}
