import { HeaderWeather } from "./createHeader";

const sleep = (x: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, x);
  });
describe("HeaderWeather", () => {
  let el: HTMLElement;

  // await sleep(100)

  const originalFetch = window.fetch;

  window.fetch = jest.fn().mockResolvedValue({
    json: () =>
      Promise.resolve({
        weather: [
          {
            id: 804,
            main: "Clouds",
            description: "overcast clouds",
            icon: "04d",
          },
        ],

        main: {
          temp: 8.86,
          feels_like: 6.08,
          temp_min: 8.86,
          temp_max: 8.86,
          pressure: 1014,
          humidity: 88,
          sea_level: 1014,
          grnd_level: 988,
        },
        coord: { lon: 37.6156, lat: 55.7522 },

        timezone: 10800,
        id: 625144,
        name: "Saratov",
        cod: 200,
      }),
  });
  const div = document.createElement("div");
  document.body.append(div);
  el = document.querySelector("div") as HTMLElement;
  beforeAll(async () => {
    new HeaderWeather(el);
    await sleep(100);
  });

  afterEach(() => {
    window.fetch = originalFetch;
  });
  it("is a function", () => {
    expect(HeaderWeather).toBeInstanceOf(Function);
  });
  it("has weather data", () => {
    expect(el.querySelector("div")).toBeDefined();
    /*  expect(el.querySelector("div")?.innerHTML).toMatch(`
    <p> Today in </p>
    <p> Saratov    8°C</p>
    <img src = 'https://openweathermap.org/img/wn/o4d@2x.png'/>
    `)  */

    expect(el.querySelector("img")?.src).toBe(
      "https://openweathermap.org/img/wn/04d@2x.png",
    );
    expect(el.querySelectorAll("p").length).toBe(2);

    expect(el.querySelectorAll("p")[1].innerHTML).toEqual(" Saratov    8°C");
  });
});
