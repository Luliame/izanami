import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { WeatherServiceService } from 'src/services/weather-service.service';
import {IWeather} from 'src/app/interfaces/IWeather';
import { lightCityInterface } from '../interfaces/lightCityInterface';
import { Geolocation } from '@capacitor/geolocation';

// utilities
import { unitTempeatureMeasurement } from 'src/utility/unitTemperatureMeasurement';


// geoLoc
const printCurrentPosition = async () => {
  const coordinates = await Geolocation.getCurrentPosition();

  console.log('Current position:', coordinates);
};
//


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

  @Input() public weather : IWeather;

  public cities = []; 

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

  constructor(
    private _weatherService : WeatherServiceService
  ) 
  { }

  ngOnInit() {
    printCurrentPosition();

    this.weather = {
      temperature : 0,
      humidity : 0,
      commentary : "",
      location : "",
      visualisation : ""
    };
    
    this.resolveHumidityEmoji();
    this.resolveTemperatureEmoji();

    // this.loadWeather("Clermont-Ferrand");
  }

  // Méthode de chargement de la météo selon la ville fournie en paramètre 
  loadWeather(city : string){
    // c'est pété !
    this._weatherService.getWeatherFromCity(city).toPromise().then( weather => {
      var i : IWeather = {
        temperature :  unitTempeatureMeasurement.TemperatureTranslater(weather.main.temp,"Celsius"),
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

  // méthode autocomplétion de Ville 
  loadCity(search : string){
    this._weatherService.searchforCities(search).subscribe( {next: cities => {
      this.cities = cities;
    }, error: (error)=>{console.log(error);} });
  }


}
