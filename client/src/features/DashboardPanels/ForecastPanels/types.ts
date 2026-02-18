import {Day, Conditions} from "../../../types/types";
import {Astro} from "../AstroPanels/types";

export interface Forecast {
  forecastday: ForecastDay[];
}

export interface ForecastDay {
  date: string;
  day: Day;
  hour: ForecastHour[];
  astro: Astro;
}

export interface ForecastHour {
  time: string;
  temp_c: number;
  temp_f: number;
  wind_mph: number;
  wind_kph: number;
  condition: Conditions;
}
