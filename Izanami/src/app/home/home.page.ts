import { Component } from '@angular/core';
import { IWeather } from '../interfaces/IWeather';
import { WeatherServiceService } from 'src/services/weather-service.service';
import { weatherUtil } from 'src/utility/weatherUtil';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  public weather : IWeather;

  constructor(private _weatherService : WeatherServiceService) 
  {
    this.loadWeather("Clermont-Ferrand");
  }

  // Méthode de chargement de la météo selon la ville fournie en paramètre 
  loadWeather(city : string){
    // c'est pété !
    this._weatherService.getWeatherFromCity(city).toPromise().then( weather => {
      var i : IWeather = {
        temperature : weather.main.temp,
        humidity : weather.main.humidity,
        commentary : weather.weather[0].description,
        location : weather.name,
        visualisation : weather.weather[0].description,

        computedTemperature : weatherUtil.processTemperature(weather.main.temp),
        computedHumidity : weatherUtil.processHumidity(weather.main.humidity),
        computedVisualisation : weatherUtil.processVisualisation(weather.weather[0].description)
      };
      this.weather = i;

    }).catch(error => { console.log("loading error",error)});
  }
}
