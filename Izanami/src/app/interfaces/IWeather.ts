export interface IWeather {
    temperature : number,
    humidity : number,
    commentary ?: string,
    location : string,
    visualisation : string,

    computedTemperature : string,
    computedHumidity : string,
    computedVisualisation : string
}