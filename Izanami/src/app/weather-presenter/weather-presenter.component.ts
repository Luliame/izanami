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

  public weather ? : IWeather = null;

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


  randomIntFromInterval(min:number, max:number):number { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  
  getHumidity():number {
    //TODO depuis l'appel api simplifié
    return this.randomIntFromInterval(0, 100);
  }
  
  getTemperature():number {
    //TODO depuis l'appel api simplifié
    return this.randomIntFromInterval(-10, 30);
  }

  // resolveTemperature(temperature : number) {
  //   if (temperature <= this.coldVal){
  //     this.temperatureEmoji = this.coldEmoji;
  //   }
  //   else if(temperature >= this.hotVal){
  //     this.temperatureEmoji = this.hotEmoji;
  //   }
  //   else{
  //     this.temperatureEmoji = this.defaultTempEmoji;
  //   }
  // }

  // resolveHumidity(humidity : number) {
  //   if (humidity <= this.dryVal){
  //     this.humidityEmoji = this.dryEmoji;
  //   }
  //   else if(humidity >= this.wetVal){
  //     this.humidityEmoji = this.wetEmoji;
  //   }
  //   else{
  //     this.humidityEmoji = this.defaultHumEmoji;
  //   }
  // }

  resolveTemperature() {
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

  resolveHumidity() {
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

  // resolveTemperature() {
  //   if (this.temperature <= this.coldVal){
  //     this.temperatureEmoji = this.coldEmoji;
  //   }
  //   else if(this.temperature >= this.hotVal){
  //     this.temperatureEmoji = this.hotEmoji;
  //   }
  //   else{
  //     this.temperatureEmoji = this.defaultTempEmoji;
  //   }
  // }

  // resolveHumidity() {
  //   if (this.humidity <= this.dryVal){
  //     this.humidityEmoji = this.dryEmoji;
  //   }
  //   else if(this.humidity >= this.wetVal){
  //     this.humidityEmoji = this.wetEmoji;
  //   }
  //   else{
  //     this.humidityEmoji = this.defaultHumEmoji;
  //   }
  // }

  constructor(
    private _weatherService : WeatherServiceService
  ) 
  {
    // var weather : IWeather = this.loadWeather("Clermont-Ferrand");
    
    // this.temperature = weather.temperature;
    this.humidity = this.getHumidity();
    // this.temperature = this.getTemperature();
    // this.humidity = this.getHumidity();
    
    this.commentary = "risque d'averces";
    this.location = "localisation";
    this.visualisation = this.visuList[Math.floor(Math.random() * this.visuList.length)];
  }

  ngOnInit() {

    this.weather = {
      temperature : 0,
      humidity : 0,
      commentary : "",
      location : "",
      visualisation : ""
    };
    
    this.resolveHumidity();
    this.resolveTemperature();

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

      this.resolveHumidity();
      this.resolveTemperature();
    }).catch(error => { console.log("loading error",error)});
    //

    // var i : IWeather = {
    //   temperature : this.getTemperature(),
    //   humidity : this.getHumidity(),
    //   commentary : "weather.weather[0].description",
    //   location : "weather.name",
    //   visualisation : "weather.weather[0].description"
    // };
    // this.weather = i;
    // this.resolveHumidity();
    // this.resolveTemperature();
  }
}

export interface IWeather {
    temperature : number,
    humidity : number,
    commentary ?: string,
    location : string,
    visualisation : string
}