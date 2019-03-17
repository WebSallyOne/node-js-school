import { EventEmitter } from 'events';

type ListenerCallbackType = (...args: any[]) => void;

export interface IWeatherData {
    temperature?: number;
    description?: string;
}

export enum WeatherStationEvents {
    DATA_UPDATED_EVENT = 'dataUpdated'
}

class WeatherStation {
    private _eventEmitter: EventEmitter;
    private _data: IWeatherData;

    constructor() {
        this._eventEmitter = new EventEmitter();
        this._data = {};
    }

    Subscribe(event: WeatherStationEvents, listener: ListenerCallbackType) {
        this._eventEmitter.on(event, listener);
    }

    Unsubscribe(event: WeatherStationEvents, listener: ListenerCallbackType) {
        this._eventEmitter.off(event, listener);
    }

    _emitData() {
        this._eventEmitter.emit(WeatherStationEvents.DATA_UPDATED_EVENT, this._data);
    }

    SetData(newData: IWeatherData) {
        Object.assign(this._data, newData);
        this._emitData();
    }
}

const weatherStation = new WeatherStation();

export { weatherStation };