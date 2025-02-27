import { networkService } from '@shared/globals';
import { Variable } from 'astal';

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

  return (
    <>
      <WifiBTButton
        wifiOnArrowClick={arrowHandler('wifi')}
        bluetoothOnArrowClick={arrowHandler('bluetooth')}
      />
      <WifiBTMenu revealChild={revealChild()} currentPage={currentPage()} />
    </>
  );
}
