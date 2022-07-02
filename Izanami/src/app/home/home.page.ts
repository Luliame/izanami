import { Component } from '@angular/core';
import { IWeather } from '../interfaces/IWeather';
import { WeatherServiceService } from 'src/services/weather-service.service';
import { weatherUtil } from 'src/utility/weatherUtil';
import { Geolocation } from '@capacitor/geolocation';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  public weather : IWeather;
  // private city : string = "Clermont-Ferrand";
  private city : string;
  
  constructor(private _weatherService : WeatherServiceService) 
  {
    this.loadWeather();
    // this.loadCity();
  }

  // Méthode de chargement de la météo
  loadWeather(){
    if (this.city){
      this.loadWeatherFromCity(this.city);
    }
    else{
      this.loadWeatherFromGeoloc();
    }
  }
  
  // Methode permetant de récupérer la longitude et latitude de l'utilisateur
  getLongitudeLatitude() {
    return Geolocation.getCurrentPosition().then( geoloc =>{
      return {'lon': geoloc.coords.longitude, 'lat' : geoloc.coords.latitude}
    }).catch(error => { console.log("loading error",error)});
  }
  

  // Méthode de chargement de la météo par geolocalisation 
  loadWeatherFromGeoloc(){
    this.getLongitudeLatitude().then(loc => {
      let lon = loc['lon'];
      let lat = loc['lat'];

      this._weatherService.weatherForecastByGeoLocation(lat, lon).toPromise().then( weather => {
        // duplication de fou => service incomplet 
        let temp = weather.main.temp;
        let visu = weather.weather[0].icon;
        
        let i : IWeather = {
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
    });
  }

  // Méthode de chargement de la météo depuis la ville en paramètre 
  loadWeatherFromCity(city : string){
    this._weatherService.getWeatherFromCity(city).toPromise().then( weather => {
      let temp = weather.main.temp;
      let visu = weather.weather[0].icon;
      
      let i : IWeather = {
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
  
  public cities = []; 

  // méthode autocomplétion de Ville 
  searchCity(search : string){
    this._weatherService.searchforCities(search).subscribe( {next: cities => {
      this.cities = cities;
    }, error: (error)=>{console.log(error);} });
  }
  
  loadCity(){
    // service inutilisable...
    
    // this.getLongitudeLatitude().then(loc => {
    //   // console.log('lat ' + loc['lat'] + ' lon ' +  loc['lon']);
    //   this._weatherService.getCityByCoordinates(loc['lat'], loc['lon']).toPromise().then(city => {
    //     console.log('ctity ');
    //     console.log(city);
    //   })
    // });
  }
}
