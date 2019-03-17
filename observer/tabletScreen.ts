import { IObserver, IWeatherData } from './contracts';

export class TabletScreen implements IObserver {
    Update(data: IWeatherData): void {
        const { temperature, description } = data;

        console.log(`Tablet screen shows temprerature: ${temperature}. Description: ${description}`);
    }
}