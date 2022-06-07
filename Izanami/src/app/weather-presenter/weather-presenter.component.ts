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

  constructor() 
  {

    this.temperature = "🌡 30°C";
    // this.humidity = this.getHumidity();
    this.humidity = "💧 60%";
    this.commentary = "risque d'averces";
    this.location = "localisation";
    this.visualisation = this.visuList[Math.floor(Math.random() * this.visuList.length)];

  }

  ngOnInit() {}

}
