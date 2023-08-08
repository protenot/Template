export async function obtainWeather(cityName:string):Promise<any> {
    const API_KEY = "c768bc4e962d2a69c28ba404045dc96c";
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${API_KEY}`
    );
    // console.log(response);
    const json = await response.json();
    console.log(json);
    return json;
  }
  