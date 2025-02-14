import { AppMenu } from './components/AppMenu';
import { IdleInhibitor } from './components/IdleInhibitor';
import { MediaPlayer } from './components/mediaplayer/MediaPlayer';
import { SysInfo } from './components/sys-info/SysInfo';

export function LeftModule() {
  return (
    <>
      <AppMenu />

      <SysInfo />

      <MediaPlayer />

      <IdleInhibitor />
    </>
  );
}
