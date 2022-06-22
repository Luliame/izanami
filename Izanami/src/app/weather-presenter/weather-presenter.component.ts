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

  constructor(
    private _weatherService : WeatherServiceService
  ) 
  { }

  ngOnInit() {
    printCurrentPosition();
  }

  // méthode autocomplétion de Ville 
  loadCity(search : string){
    this._weatherService.searchforCities(search).subscribe( {next: cities => {
      this.cities = cities;
    }, error: (error)=>{console.log(error);} });
  }


}
