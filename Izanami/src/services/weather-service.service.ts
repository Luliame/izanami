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

  constructor(
    private _http : HttpClient, 
  ) {
     
   }

   

   // Récupère le temps pour une ville 
   public getWeatherFromCity(city : string) : Observable<IDailyForecast>{
    let params = new HttpParams().set('q', city).set('appId',API_Key);


     return this._http.get<IDailyForecast>('https://api.openweathermap.org/data/2.5/weather',{params});
   }

   // search cities by cities name 
    public searchforCities(city : string) : Observable<lightCityInterface[]>{
      let params = new HttpParams().set('q', city).set('type',"municipality").set('autocomplete',1);

      return this._http.get<lightCityInterface[]>('https://api-adresse.data.gouv.fr/search/',{params});
   }

   // Récupère les prévisions météo pour des coordonés géographique  
   public weeklyWeatherForecastByCity(lat : number,long : number) : Observable<IDailyForecast> {
      let params = new HttpParams().set('lat', lat).set('lon',long).set('appId',API_Key);

      return this._http.get<IDailyForecast>('api.openweathermap.org/data/2.5/forecast',{params});
   }


}


// export interface cityInterface{
  
//     "label": string,
//     "score": number,
//     "id": string,
//     "type": string,
//     "name": string,
//     "postcode": string,
//     "citycode": string,
//     "x": number,
//     "y": number,
//     "population": number,
//     "city": string,
//     "context": string,
//     "importance": number
  
// }

// export interface lightCityInterface{
//   "city": string,
//   "label": string,
//   "name": string,
//   "x": number,
//   "y": number,
// }


// export interface IDailyForecast{
//   "coord": {
//     "lon": number,
//     "lat": number
//     },
//   "weather": [
//     {
//         "id": number,
//         "main": string,
//         "description": string,
//         "icon": string
//     }
//   ],
//   "base": string,
//   "main": {
//     "temp": number,
//     "feels_like": number,
//     "temp_min": number,
//     "temp_max": number,
//     "pressure": number,
//     "humidity": number,
//     "sea_level": number,
//     "grnd_level": number
//   },
//   "visibility": number,
//   "wind": {
//     "speed": number,
//     "deg": number,
//     "gust": number
//   },
//   "clouds": {
//     "all": number
//   },
//   "dt": number,
//   "sys": {
//     "country": string,
//     "sunrise": number,
//     "sunset": number
//   },
//   "timezone": number,
//   "id": number,
//   "name": string,
//   "cod": number
// }