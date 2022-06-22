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

    this._weatherService.getWeatherFromCity(city).toPromise().then( weather => {
      var temp = weather.main.temp;
      var visu = weather.weather[0].icon;

      var i : IWeather = {
        rawTemperature : temp,
        rawHumidity : weather.main.humidity,
        rawVisualisation : visu,

        computedTemperature : weatherUtil.processTemperature(temp),
        computedHumidity : weatherUtil.processHumidity(weather.main.humidity),
        computedVisualisation : weatherUtil.processVisualisation(visu),

        commentary : weather.weather[0].description,
        location : weather.name,
      };

      this.weather = i;
    }).catch(error => { console.log("loading error",error)});
  }
}
