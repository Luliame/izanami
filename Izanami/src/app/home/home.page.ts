import { Component } from '@angular/core';
import { IWeather } from '../interfaces/IWeather';
import { WeatherServiceService } from 'src/services/weather-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  public weather : IWeather;

  public visuList = [
    "sunny",
    "partly-sunny",
    "cloudy",
    "rainy",
    "thunderstorm",
  
    "cloudy-night",
    "moon"
  ];

  coldVal = 0;
  hotVal = 25;

  dryVal = 25;
  wetVal = 75;

  coldEmoji = "🥶 ";
  defaultTempEmoji = "🌡 ";
  hotEmoji = "🥵 ";
  temperatureEmoji = this.defaultTempEmoji;

  dryEmoji = "🏜 ";
  defaultHumEmoji = "💧 ";
  wetEmoji = "🌊 ";
  humidityEmoji = this.defaultHumEmoji;


  resolveTemperatureEmoji() {
    if (this.weather.temperature <= this.coldVal){
      this.temperatureEmoji = this.coldEmoji;
    }
    else if(this.weather.temperature >= this.hotVal){
      this.temperatureEmoji = this.hotEmoji;
    }
    else{
      this.temperatureEmoji = this.defaultTempEmoji;
    }
  }

  resolveHumidityEmoji() {
    if (this.weather.humidity <= this.dryVal){
      this.humidityEmoji = this.dryEmoji;
    }
    else if(this.weather.humidity >= this.wetVal){
      this.humidityEmoji = this.wetEmoji;
    }
    else{
      this.humidityEmoji = this.defaultHumEmoji;
    }
  }


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
        visualisation : weather.weather[0].description
      };
      this.weather = i;

      this.resolveHumidityEmoji();
      this.resolveTemperatureEmoji();
    }).catch(error => { console.log("loading error",error)});
  }
}
