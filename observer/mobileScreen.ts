import { IObserver, IWeatherData } from './contracts';

export class MobileScreen implements IObserver {
    Update(data: IWeatherData): void {
        const { temperature, description } = data;

        console.log(`Mobile screen shows temprerature: ${temperature}. Description: ${description}`);
    }
}