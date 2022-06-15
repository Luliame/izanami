import { Component, OnInit } from '@angular/core';

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

  resolveTemperature() {
    if (this.temperature <= this.coldVal){
      this.temperatureEmoji = this.coldEmoji;
    }
    else if(this.temperature >= this.hotVal){
      this.temperatureEmoji = this.hotEmoji;
    }
    else{
      this.temperatureEmoji = this.defaultTempEmoji;
    }
  }

  resolveHumidity() {
    if (this.humidity <= this.dryVal){
      this.humidityEmoji = this.dryEmoji;
    }
    else if(this.humidity >= this.wetVal){
      this.humidityEmoji = this.wetEmoji;
    }
    else{
      this.humidityEmoji = this.defaultHumEmoji;
    }
  }

  // isWet = () => {
  //   return this.humidity >= this.wetVal
  // }
  // isDry = () => {
  //   return this.humidity <= this.dryVal
  // }
  // isCold = () => {
  //   return this.temperature <= this.coldVal
  // }
  // isHot = () => {
  //   return this.temperature >= this.hotVal
  // }

  constructor() {

    this.temperature = this.getTemperature();
    this.humidity = this.getHumidity();
    // this.temperature = "🌡 30°C";
    // this.humidity = "💧 60%";
    this.commentary = "risque d'averces";
    this.location = "localisation";
    this.visualisation = this.visuList[Math.floor(Math.random() * this.visuList.length)];
  }

  ngOnInit() {
    this.resolveHumidity();
    this.resolveTemperature();
  }

}
