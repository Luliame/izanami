import { IWeather } from "src/app/interfaces/IWeather";

export class weatherUtil{
    // public visuList = [
    //   "sunny",
    //   "partly-sunny",
    //   "cloudy",
    //   "rainy",
    //   "thunderstorm",
    //
    //   "cloudy-night",
    //   "moon"
    // ];

  public static VISU_LIST = [
    {
        visu : "",
        icon : "sunny"
    },
    {
        visu : "",
        icon : "partly-sunny"
    },
    {
        visu : "",
        icon : "cloudy"
    },
    {
        visu : "",
        icon : "rainy"
    },
    {
        visu : "",
        icon : "thunderstorm"
    },
    {
        visu : "",
        icon : "cloudy-night"
    },
    {
        visu : "",
        icon : "moon"
    },
  ];

  public static COLD_VAL = 0;
  public static HOT_VAL = 25;

  public static DRY_VAL = 25;
  public static WET_VAL = 75;

  public static COLD_EMOJI = "🥶 ";
  public static DEFAULT_TEMP_EMOJI = "🌡 ";
  public static HOT_EMOJI = "🥵 ";
  
  public static DRY_EMOJI = "🏜 ";
  public static DEFAULT_HUM_EMOJI = "💧 ";
  public static WET_EMOJI = "🌊 ";


  public static processTemperature(temperature:number):string {
    let emoji = this.DEFAULT_TEMP_EMOJI;

    if (temperature <= this.COLD_VAL){
        emoji = this.COLD_EMOJI;
    }
    else if(temperature >= this.HOT_VAL){
        emoji = this.HOT_EMOJI;
    }
    else{
        emoji = this.DEFAULT_TEMP_EMOJI;
    }

    return emoji.concat(temperature.toString()).concat("°C");//TODO => unitée paramétrable !
  }

  public static processHumidity(humidity:number):string {
    let emoji = this.DEFAULT_HUM_EMOJI;

    if (humidity <= this.DRY_VAL){
      emoji = this.DRY_EMOJI;
    }
    else if(humidity >= this.WET_VAL){
      emoji =  this.WET_EMOJI;
    }
    
    return emoji.concat(humidity.toString()).concat("%");
  }

  public static processVisualisation(visualisation:string):string {
    return "";
  }
}