import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {

  constructor(
    private _http : HttpClient, 
  ) {

   }

   public getWeatherFromCity(city : string){

    let params = new HttpParams().set('q', city);

     return this._http.get<any>('https://api.openweathermap.org/data/2.5/weather',{params});
   }




}
