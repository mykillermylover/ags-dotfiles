import { AudioControlMenu } from '@components/audio-control/AudioControlMenu.tsx';
import { CalendarMenu } from '@components/CalendarMenu.tsx';
import { App } from 'astal/gtk3';

import Bar from './src/Bar';
import style from './style.scss';

App.start({
  css: style,
  main() {
    App.get_monitors().map(Bar);
    AudioControlMenu();
    CalendarMenu();
  },
});
