import { IObservable, IObserver, IWeatherData } from './contracts';

export class WeatherStation implements IObservable {
    private _observers: Set<IObserver>;
    private _data: IWeatherData;

    constructor() {
        this._observers = new Set();
        this._data = {};
    }

    Subscribe(subscriber: IObserver): void {
        this._observers.add(subscriber);
    }

    Unsubscribe(subscriber: IObserver): void {
        this._observers.delete(subscriber);
    }

    NotifyObservers(): void {
        this._observers.forEach(observer => observer.Update(this._data));
    }

    UpdateData(newData: IWeatherData) {
        Object.assign(this._data, newData);
        this.NotifyObservers();
    }
}