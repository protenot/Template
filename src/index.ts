import { getCity } from "./getCity";
import { obtainWeather } from "./obtainWeather";
const city: string = await getCity();
console.log(city);
const weather = await obtainWeather(city);
console.log(weather);
