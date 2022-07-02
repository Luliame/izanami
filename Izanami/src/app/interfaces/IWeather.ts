export interface IWeather {
    rawTemperature : number,
    rawHumidity : number,
    commentary ?: string,
    location : string,
    rawVisualisation : string,
    
    computedTemperature : string,
    computedHumidity : string,
    computedVisualisation : string
}