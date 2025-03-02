import { networkService } from '@shared/globals';
import { Variable } from 'astal';
import { App } from 'astal/gtk3';

import { WifiBTButton } from './WifiBTButton';
import { WifiBTMenu } from './WifiBTMenu';

type Page = 'wifi' | 'bluetooth';

export function WifiBT() {
  const wifi = networkService.wifi;
  const currentPage = Variable<Page>('wifi');
  const revealChild = Variable(false);

  const toggleReveal = () => {
    revealChild.set(!revealChild.get());
  };

  const arrowHandler = (name: Page) => () => {
    if (name === currentPage.get() || !revealChild.get()) {
      if (name === 'wifi') {
        wifi.scan();
      }

      toggleReveal();
    }

    currentPage.set(name);
  };

  App.connect('window-toggled', (_, window) => {
    if (window.name === 'quick-settings' && !window.visible) {
      revealChild.set(false);
    }
  });

  const activePage = Variable.derive(
    [currentPage(), revealChild()],
    (currentPage, revealChild) => {
      if (!revealChild) {
        return;
      }

      return currentPage;
    },
  );

  const onDestroy = () => {
    currentPage.drop();
    revealChild.drop();
    activePage.drop();
  };

  return (
    <box onDestroy={onDestroy} vertical className="wifi-bt">
      <WifiBTButton
        activePage={activePage()}
        wifiOnArrowClick={arrowHandler('wifi')}
        bluetoothOnArrowClick={arrowHandler('bluetooth')}
      />

      <WifiBTMenu revealChild={revealChild()} currentPage={currentPage()} />
    </box>
  );
}
