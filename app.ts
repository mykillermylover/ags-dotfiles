import { AudioControl } from '@components/AudioControl.tsx';
import { App } from 'astal/gtk3';

import Bar from './src/Bar';
import style from './style.scss';

App.start({
  css: style,
  main() {
    App.get_monitors().map(Bar);
    AudioControl();
  },
});
