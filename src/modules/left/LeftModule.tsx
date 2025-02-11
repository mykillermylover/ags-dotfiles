import { MediaPlayer } from './player/MediaPlayer';
import { Menu } from './menu/Menu';
import { IdleInhibitor } from './idle-inhibitor/IdleInhibitor';
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
