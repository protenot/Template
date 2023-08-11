import { HeaderWeather } from "./createHeader";
import { MainWeather } from "./createMain";
import "./style.css";
new HeaderWeather(document.querySelector("#header-container") as HTMLElement);
new MainWeather(document.querySelector("#main-container") as HTMLElement);
