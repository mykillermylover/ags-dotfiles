#!/usr/bin/gjs -m
import Bar from '@bar/Bar';
import { Popups } from '@bar/widgets/popups';
import { registerWindows } from '@shared/utils';
import { App } from 'astal/gtk3';

import style from './style.scss';

App.start({
  css: style,
  main() {
    App.get_monitors().map(Bar);
    registerWindows(Popups);
  },
});
