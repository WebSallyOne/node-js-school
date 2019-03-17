import { IWeatherData, weatherStation, WeatherStationEvents } from './weatherStation';

export class MobileScreen {

    constructor() {
        weatherStation.Subscribe(WeatherStationEvents.DATA_UPDATED_EVENT, this._displayWeather);
    }

    private _displayWeather(data: IWeatherData): void {
        const { temperature, description } = data;

        console.log(`Mobile screen shows temprerature: ${temperature}. Description: ${description}`);
    }
}