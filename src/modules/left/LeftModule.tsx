import { IdleInhibitor } from './idle-inhibitor/IdleInhibitor';
import { Menu } from './menu/Menu';
import { MediaPlayer } from './player/MediaPlayer';
import { SysInfo } from './sys-info/SysInfo';

export function LeftModule() {
  return (
    <>
      <Menu />

      <SysInfo />

      <MediaPlayer />

      <IdleInhibitor />
    </>
  );
}
