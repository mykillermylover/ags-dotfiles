import { MediaPlayerService } from '@shared/connectables';
import { PlayerAction } from '@shared/connectables/mediaplayer';
import { hyprDispatchExec } from '@shared/globals';

export function requestHandler(
  request: string,
  res: (response: unknown) => void,
): void {
  try {
    switch (request) {
      case 'restart': {
        restartApp();
        break;
      }
      case 'play-pause':
      case 'previous':
      case 'next': {
        playerAction(request);
        break;
      }
    }

    res(`${request} OK`);
  } catch (error_) {
    const error = error_ as Error;

    res(`${request} ERROR: ${error?.message}`);
  }
}

export const restartApp = () => hyprDispatchExec('killall mshell; mshell');

export const playerAction = (action: PlayerAction) => {
  const mediaplayer = MediaPlayerService.get_default();

  mediaplayer[action]();
};
