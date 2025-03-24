#!/usr/bin/gjs -m
import { requestHandler, restartApp } from '@request-handler';
import { hyprlandService } from '@shared/globals';
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
  requestHandler,
});

hyprlandService.connect('monitor-added', restartApp);
