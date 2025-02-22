#!/usr/bin/gjs -m
import { hyprDispatchExec, hyprlandService } from '@shared/globals';
import { registerWindows } from '@shared/utils';
import { WINDOWS } from '@windows';
import Bar from '@windows/bar/Bar';
import { App } from 'astal/gtk3';

import style from './style.scss';

App.start({
  instanceName: 'mshell',
  css: style,
  main() {
    App.get_monitors().map(Bar);
    registerWindows(WINDOWS);
  },
});

hyprlandService.connect('monitor-added', () => {
  hyprDispatchExec('killall mshell; mshell');
});
