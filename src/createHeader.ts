import { Component } from "./component/component";

export class HeaderWeather extends Component {
  state: Partial<Record<string, any>> = {
    weather: [
      { id: 600, main: "Snow", description: "light snow", icon: "13n" },
    ],
    name: "",
    longitude: "37.6171",
    city: "Moscow",
    latitude: "55.7483",
    main: { temp: 0 },
    coord: { lon: 37.6156, lat: 55.7522 },
  };

  async onMount(): Promise<void> {
    await this.getCity();
    //console.log(this.getCity())
    this.el.innerHTML = this.render();
    this.subscribeToEvents();
  }

  template(tpl: string, data: Record<string, any>): string {
    console.log(data);
    const tplResult = tpl.replace(
      /{{(\w+)}}/g,
      (match: string, key: string) => {
        if (key === "NAME") return data.name;
        if (key === "TEMP") return Math.floor(data.main.temp);
        if (key === "ICON") return data.weather[0].icon;
        return data[key];
      },
    );
    return tplResult;
  }

  render(): string {
    return this.template(
      `<div class = "local-container">
            <p> Today in </p>
            <p> {{NAME}}    {{TEMP}}°C</p>
            <img src = "https://openweathermap.org/img/wn/{{ICON}}@2x.png"/>
            </div>

            `,
      this.state,
    );
  }

  getCity = async () => {
    const responseCity = await fetch("https://get.geojs.io/v1/ip/geo.json");

    //console.log(responseCity);

    const jsonCity = await responseCity.json();
    const weather = await this.obtainWeather(jsonCity.city);
    console.log(jsonCity.city);

    this.setState(weather);
    return jsonCity.city;
  };
  async obtainWeather(cityName: string): Promise<any> {
    const API_KEY = "c768bc4e962d2a69c28ba404045dc96c";
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${API_KEY}`,
    );
    // console.log(response);
    const json = await response.json();
    console.log(json);
    return json;
  }
}
