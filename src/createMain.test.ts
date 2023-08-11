import { MainWeather } from "./createMain";

const sleep = (x: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, x);
  });
describe("MainWeather", () => {
  let el: HTMLElement;
  let input: HTMLInputElement | null;

  let mapContainer: HTMLDivElement | null;
  let historyDiv: HTMLDivElement | null;

  const originalFetch = window.fetch;

  window.fetch = jest.fn().mockResolvedValue({
    json: () =>
      Promise.resolve({
        /* coord: {
            lon,
            lat,
          }, */
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
  input = el.querySelector("input");
  mapContainer = el.querySelector(".map-container");
  historyDiv = el.querySelector(".history");
  beforeAll(async () => {
    new MainWeather(el);
    await sleep(100);
  });

  afterEach(() => {
    window.fetch = originalFetch;
  });
  it("is a function", () => {
    expect(MainWeather).toBeInstanceOf(Function);
  });
  it("has input", () => {
    expect(input).toBeDefined();
  });
  it("has button", () => {
    expect(el.querySelector("button")).toBeDefined();
    expect(el.querySelector("button")?.textContent).toEqual(" Push");
  });

  it("shows local weather", () => {
    expect(el.querySelector("p")?.innerHTML).toEqual(
      " City : Saratov  Temperature :   8°C",
    );
  });
  it("has a map", () => {
    expect(mapContainer).toBeDefined();
  });

  it("has a history", () => {
    expect(historyDiv).toBeDefined();
    console.log(historyDiv);
  });
});
