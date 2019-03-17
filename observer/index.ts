import { weatherStation } from './weatherStation';
import { MobileScreen } from './mobileScreen';
import { TabletScreen } from './tabletScreen';

const mobileScreen = new MobileScreen();
const tabletScreen = new TabletScreen();

weatherStation.Subscribe(mobileScreen);
weatherStation.Subscribe(tabletScreen);

weatherStation.UpdateData({ temperature: 0, description: 'Cold. Very cold.' });
weatherStation.UpdateData({ temperature: 2 });
weatherStation.UpdateData({ temperature: 35, description: 'Give me some cold mochito.' });