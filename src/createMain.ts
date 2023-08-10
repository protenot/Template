//import { Component } from "./component";
import { HeaderWeather } from "./createHeader";

export class MainWeather extends HeaderWeather {
  map = `map`;
  history: string[] = [];

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
    // console.log(this.getCity())
    this.el.innerHTML = this.render();
    this.subscribeToEvents();
  }

  template(tpl: string, data: Record<string, any>): string {
    console.log(data);
    const tplResult = tpl
      .replace(/{{for (\w+)}}(.+){{endfor}}/g, (match, key, tmpl) => {
        let res = "";
        if (this.history) {
          this.history = this.history.reduce((result: string[], item) => {
            return result.includes(item) ? result : [...result, item];
          }, []);

          this.history.forEach((el) => {
            res = `<span>${this.template(tmpl, { name: el })}</span>${res}`;
          });
        }
        return res;
      })

      .replace(/{{(\w+)}}/g, (match: string, key: string) => {
        if (key === "NAME") return data.name;
        if (key === "TEMP") return Math.floor(data.main.temp);
        if (key === "ICON") return data.weather[0].icon;
        return data[key];
      });
    return tplResult;
  }

  render(): string {
    return this.template(
      `<div class = "form-container">
            <input/>
            <button> Push</button>
        </div>
         
        <p> City : {{NAME}}  Temperature :   {{TEMP}}°C</p>
        <img src = "https://openweathermap.org/img/wn/{{ICON}}@2x.png"/>
        
        <div class = "history">
        {{for items}}<button>{{NAME}}</button>{{endfor}}
        </div>
        <div class = "map-container">    
        {{MAP}}
        </div>

            `,
      this.state,
    );
  }

  getCity = async () => {
    // try {
    const responseCity = await fetch("https://get.geojs.io/v1/ip/geo.json");

    //console.log(responseCity);
    // if (responseCity.ok) {
    const jsonCity = await responseCity.json();
    const weather = await this.obtainWeather(jsonCity.city);
    const { lon } = weather.coord;
    const { lat } = weather.coord;
    this.map = `<image src = https://static-maps.yandex.ru/1.x/?ll=${lon},${lat}&size=450,450&z=12&l=map`;
    console.log(lon);
    console.log(jsonCity.city);

    this.setState(weather);
    this.setState({ MAP: this.map });

    this.history = await this.getFromLocalStorage();
    if (this.history) {
      console.log(this.history);
      return jsonCity.city;
    } else {
      this.history = [jsonCity.city];

      return jsonCity.city;
    }
    /* } else {
        throw new Error("https://get.geojs.io/v1/ip/geo.json OUT OF REACH");
      }
    } catch (error) {
      console.log(error);
    } */
  };

  async obtainWeather(cityName: string): Promise<any> {
    const API_KEY = "c768bc4e962d2a69c28ba404045dc96c";
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${API_KEY}`,
    );
    // console.log(response);
    const json = await response.json();

    return json;
  }
  putInLocalStorage = (set: string[]) => {
    

    if (set.length > 10) {
      set.shift();
    }

    localStorage.setItem("history", JSON.stringify(set));
  };

  getFromLocalStorage = async () => {
    const history = localStorage.getItem("history") as string;
    return JSON.parse(history);
  };

  clickButton = async (event: Event) => {
    const eventTarget = event.target as HTMLElement;
    const weather = await this.obtainWeather(
      this.el.querySelector("input")?.value || eventTarget.innerHTML,
    );
    if (weather) {
      this.setState(weather);
      const { lon } = weather.coord;
      const { lat } = weather.coord;
      this.map = `<image src = https://static-maps.yandex.ru/1.x/?ll=${lon},${lat}&size=450,450&z=12&l=map`;
      this.setState({ MAP: this.map });
      // this.history = new Set as unknown as unknown[];
      console.log(this.state.name);
      this.history.push(this.state.name);
      console.log(this.history);
      this.putInLocalStorage(this.history as string[]);
      this.el.innerHTML = this.render();
      this.subscribeToEvents();
    }
  };
  events = {
    "click@button": this.clickButton,
    "click@.history": this.clickButton,
  };
}
