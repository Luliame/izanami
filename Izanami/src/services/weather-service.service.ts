import { APP_ID, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// interfaces
import { cityInterface } from 'src/app/interfaces/cityInterface'
import { IDailyForecast } from 'src/app/interfaces/IDailyForecast'
import { IWeather } from 'src/app/interfaces/IWeather'
import { lightCityInterface } from 'src/app/interfaces/lightCityInterface';


const API_Key = "e859088790523b685f63a31f678bd4ff";


@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {
  
  constructor(private _http : HttpClient, ) { }
  
  // Récupère le temps pour une ville 
  public getWeatherFromCity(city : string) : Observable<IDailyForecast>{
    let params = new HttpParams().set('q', city).set('lang','fr').set('appId',API_Key);
    
    
    return this._http.get<IDailyForecast>('https://api.openweathermap.org/data/2.5/weather',{params});
  }
  
  // search cities by cities name 
  public searchforCities(city : string) : Observable<lightCityInterface[]>{
    let params = new HttpParams().set('q', city).set('type',"municipality").set('autocomplete',1);
    
    return this._http.get<lightCityInterface[]>('https://api-adresse.data.gouv.fr/search/',{params});
  }
  
  // Récupère la ville depuis la géolocalisation
  public getCityByCoordinates(lat : number,long : number) : Observable<GouvReverseChange>{
    let params = new HttpParams().set('lat', lat).set('lon',long);
    
    return this._http.get<GouvReverseChange>('https://api-adresse.data.gouv.fr/reverse/',{params});
  }
  
  
  
  // Récupère les prévisions météo pour des coordonés géographique  
  public weeklyWeatherForecastByGeolocation(lat : number,long : number) : Observable<IDailyForecast> {
    let params = new HttpParams().set('lat', lat).set('lon',long).set('appId',API_Key);
    
    return this._http.get<IDailyForecast>('api.openweathermap.org/data/2.5/forecast',{params});
  }
  
  // Récupère la météo selon une latitude/longitude
  public weatherForecastByGeoLocation(lat : number,long : number){
    let params = new HttpParams().set('lat', lat).set('lon',long).set('appId',API_Key);
    
    return this._http.get<IDailyForecast>('https://api.openweathermap.org/data/2.5/weather',{params});
  }
}

export interface GouvReverseChange {
  "types" : string,
  "versions" : string,
  "features" : feature[],
  "attribution": string,
  "licence": string,
  "limit": number
}

export interface feature {
  "type": string,
  "geometry": {
    "type": string,
    "coordinates": [
      number,
      number
    ]
  },
  "properties": {
    "label": string,
    "score": number,
    "housenumber": string,
    "id": string,
    "name": string,
    "postcode": string,
    "citycode": string,
    "x": number,
    "y": number,
    "city": string,
    "context": string,
    "type": string,
    "importance": number,
    "street": string,
    "distance": number
  }
}