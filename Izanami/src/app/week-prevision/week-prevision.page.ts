import { Component, OnInit } from '@angular/core';
import { WeatherServiceService } from 'src/services/weather-service.service';
import { Geolocation } from '@capacitor/geolocation';
import { IWeather } from '../interfaces/IWeather';
import { weatherUtil } from 'src/utility/weatherUtil';

@Component({
  selector: 'app-week-prevision',
  templateUrl: './week-prevision.page.html',
  styleUrls: ['./week-prevision.page.scss'],
})
export class WeekPrevisionPage implements OnInit {

  public weather : IWeather;

  constructor(private _weatherService : WeatherServiceService) { }

  ngOnInit() {
    this.loadWeeklyForecast();
  }

  // Methode permetant de récupérer la longitude et latitude de l'utilisateur
  getLongitudeLatitude() {
    return Geolocation.getCurrentPosition().then( geoloc =>{
      return {'lon': geoloc.coords.longitude, 'lat' : geoloc.coords.latitude}
    }).catch(error => { console.log("loading error",error)});
  }


  loadWeeklyForecast(){
    this.getLongitudeLatitude().then(loc => {
      let lon = loc['lon'];
      let lat = loc['lat'];
    
      this._weatherService.weeklyWeatherForecastByGeolocation(lat, lon).toPromise().then( weather => {

        console.log(weather);

        // // duplication de fou => service incomplet 
        // let temp = weather.main.temp;
        // let visu = weather.weather[0].icon;
        
        // let i : IWeather = {
        //   rawTemperature : temp,
        //   rawHumidity : weather.main.humidity,
        //   rawVisualisation : visu,
          
        //   computedTemperature : weatherUtil.processTemperature(temp),
        //   computedHumidity : weatherUtil.processHumidity(weather.main.humidity),
        //   computedVisualisation : weatherUtil.processVisualisation(visu),
          
        //   commentary : weather.weather[0].description,
        //   location : weather.name,
        // };
        
        // this.weather = i;
        
      }).catch(error => { console.log("loading error",error)});
    });
  }
}
