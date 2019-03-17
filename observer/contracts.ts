export interface IObserver {
    Update(data: any): void;
}

export interface IObservable {
    Subscribe(subscriber: IObserver): void;
    Unsubscribe(subscriber: IObserver): void;
    NotifyObservers(): void;
}

export interface IWeatherData {
    temperature?: number;
    description?: string;
}