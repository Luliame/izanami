import { IWeather } from "src/app/interfaces/IWeather";

export class weatherUtil{

    public static DEFAULT_VISU = "cloud-offline-outline";

    public static VISU_LIST = new Map<string, string>(
    [
        [
            "01",
            "sunny"
        ],
        [
            "02",
            "partly-sunny"
        ],
        [
            "03",
            "cloudy"
        ],
        [
            "04", 
            "cloudy"
        ],
        [
            "09",
            "rainy"
        ],
        [
            "10",
            "rainy"
        ],
        [
            "11",
            "thunderstorm"
        ],
        [
            "13",
            "snow-outline"
        ],
        [
            "50",
            "reorder-three-outline"
        ],

        // [
        //     "7",
        //     "cloudy-night"
        // ],
        // [
        //     "8",
        //     "moon"
        // ],
    ]
  );

  public static COLD_BOUND = 0;
  public static HOT_BOUND = 25;

  public static DRY_BOUND = 25;
  public static WET_BOUND = 75;

  public static COLD_EMOJI = "🥶 ";
  public static DEFAULT_TEMP_EMOJI = "🌡 ";
  public static HOT_EMOJI = "🥵 ";
  
  public static DRY_EMOJI = "🏜 ";
  public static DEFAULT_HUM_EMOJI = "💧 ";
  public static WET_EMOJI = "🌊 ";


  public static CELSIUS = "°C";
  public static FAHRENHEIM = "°F";


  public static processTemperature(rawTemperature:number, unity:string = this.CELSIUS ):string {
    var emoji = this.DEFAULT_TEMP_EMOJI;
    var temperature = this.TemperatureConverter(rawTemperature, unity);

    if (temperature <= this.COLD_BOUND){
        emoji = this.COLD_EMOJI;
    }
    else if(temperature >= this.HOT_BOUND){
        emoji = this.HOT_EMOJI;
    }
    else{
        emoji = this.DEFAULT_TEMP_EMOJI;
    }

    return emoji.concat(temperature.toString()).concat("°C");//TODO => unitée paramétrable !
  }

  public static processHumidity(humidity:number):string {
    var emoji = this.DEFAULT_HUM_EMOJI;

    if (humidity <= this.DRY_BOUND){
      emoji = this.DRY_EMOJI;
    }
    else if(humidity >= this.WET_BOUND){
      emoji =  this.WET_EMOJI;
    }
    
    return emoji.concat(humidity.toString()).concat("%");
  }

  public static processVisualisation(visualisation:string):string {
    
    var v = this.VISU_LIST.get(visualisation.slice(0, -1));

    if (v == undefined)
        return this.DEFAULT_VISU;
        // return this.VISU_LIST.values().next().value;

    return v;
  }

  // donne la température selon la mesure demander
  public static TemperatureConverter(temperature:number, unityDesired:string) : number{
      // Unité demandé 
      switch(unityDesired){
          case this.CELSIUS :
              return Math.round(temperature - 273.15);
          case  this.FAHRENHEIM :
              return Math.round((temperature - 273.15)*9/5+32);
          default : return temperature;
      }
  }
}