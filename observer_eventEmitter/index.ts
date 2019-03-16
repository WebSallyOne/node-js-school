import { weatherStation } from './weatherStation';
import { MobileScreen } from './mobileScreen';
import { TabletScreen } from './tabletScreen';

const mobileScreen = new MobileScreen();
const tabletScreen = new TabletScreen();

weatherStation.SetData({ temperature: 0, description: 'Cold. Very cold.' });
weatherStation.SetData({ temperature: 2 });
weatherStation.SetData({ temperature: 35, description: 'Give me some cold mochito.' });