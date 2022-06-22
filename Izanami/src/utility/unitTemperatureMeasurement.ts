export class unitTempeatureMeasurement{

    public static CELSIUS = "Celsius";
    public static FAHRENHEIM = "Fahrenheim";

    // donne la température selon la mesure demander
    public static TemperatureTranslater(temperature : number,unityDesire :string) : number{
        // Unité demandé 
        switch(unityDesire){
            case this.CELSIUS :
                return Math.round(temperature - 273.15);
            case  this.FAHRENHEIM :
                return Math.round((temperature - 273.15)*9/5+32);
            default : return temperature;
        }

    }

}