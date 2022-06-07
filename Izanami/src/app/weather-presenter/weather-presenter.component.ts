import { Component, OnInit } from '@angular/core';
import { WeatherServiceService } from 'src/services/weather-service.service';


@Component({
  selector: 'app-weather-presenter',
  templateUrl: './weather-presenter.component.html',
  styleUrls: ['./weather-presenter.component.scss'],
})
export class WeatherPresenterComponent implements OnInit {

  public temperature;
  public humidity;
  public commentary;
  public location;
  public visualisation;

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

  coldEmoji = "🥶";
  tempEmoji = "🌡";
  hotHemoji = "🥵";

  dryEmoji = "🏜";
  HumidityEmoji = "💧";
  WetEmoji = "🌊";

  // function randomIntFromInterval(min:number, max:number):number { // min and max included 
  //   return Math.floor(Math.random() * (max - min + 1) + min)
  // }
  

  // getHumidity():number {
  //   return randomIntFromInterval(-10, 30);
  // }

  resolveHumidity() {

  }

  constructor(
    private _weatherService : WeatherServiceService
  ) 
  {

    this.temperature = "🌡 30°C";
    // this.humidity = this.getHumidity();
    this.humidity = "💧 60%";
    this.commentary = "risque d'averces";
    this.location = "localisation";
    this.visualisation = this.visuList[Math.floor(Math.random() * this.visuList.length)];

  }

  lambda = () => {
    return true;
  }

  ngOnInit() {

  }

 loadWeather(city : string){
    this._weatherService.getWeatherFromCity(city).toPromise().then( weather => {
        var i : IWeather = {
          temperature : weather.main.temp,
          humidity : weather.main.humidity,
          commentary : weather.weather[0].description,
          location : weather.name,
          visualisation : weather.weather[0].description
        };
        this.weather = i;
    }).catch(error => { console.log("loading error",error)});
  }
}

export interface IWeather {
    temperature : number,
    humidity : number,
    commentary ?: string,
    location : string,
    visualisation : string
}