import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

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
  ]

  constructor() 
  {
    this.temperature = "30°C";
    this.humidity = "60%";
    this.commentary = "risque d'averces";
    this.location = "localisation";
    this.visualisation = "rainy";
  }

}
