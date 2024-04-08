// src/types/types.ts

/**
 * Represents a function that takes in a string to search upon.
 */
export interface SearchLocationProps {
  onSearch: (city: string) => void;
}

/**
 * Represents current weather data and location information.
 * forecast via forecastday holds an array of information concerned with a particular day.
 * alerts via alert holds an array of weather alert information
 */
export interface CurrentWeather {
  location: {
    name: string;
    country: string;
    region: string;
    localtime: string;
    lat?: number;
    lon?: number;
  };
  current: {
    temp_c: number;
    temp_f: number;
    feelslike_c: number;
    feelslike_f: number;
    wind_mph: number;
    wind_kph: number;
    wind_dir: string;
    wind_degree: number;
    humidity: number;
    condition: Conditions;
    uv: number;
    cloud: number;
  };
  forecast: {
    forecastday: ForecastDay[];
  };
  alerts: {
    alert: Alert[];
  };
}

/**
 * Represents a forecast day and holds an array of day objects via ForecastDay
 */
export interface Forecast {
  forecastday: ForecastDay[];
}

/**
 * Represents general forecast props for specific components that require specific data
 */
export interface ForecastProps {
  searchedLocation: CurrentWeather;
  forecast: Forecast | undefined;
  measurementUnit?: string;
  colorTheme: string;
}

/**
 * Represents data regarding a forecast day, as well as holding an array for data concerned with the hour
 */
export interface ForecastDay {
  date: string;
  day: Day;
  hour: ForecastHour[];
}

/**
 * Represents all data that is concerned with hourly updates,
 * as well as the Conditions data object
 */
export interface ForecastHour {
  time: string;
  temp_c: number;
  temp_f: number;
  wind_mph: number;
  wind_kph: number;
  condition: Conditions;
}

/**
 * Represents all data that is concerned with daily updates,
 * as well as the Conditions data object
 */
export interface Day {
  mintemp_c: number;
  maxtemp_c: number;
  mintemp_f: number;
  maxtemp_f: number;
  avgtemp_c: number;
  avgtemp_f: number;
  condition: Conditions;
  daily_chance_of_rain: number;
  daily_chance_of_snow: number;
  totalprecip_mm: number;
  totalprecip_in: number;
  totalsnow_cm: number;
  uv: number;
}

/**
 * Represents data concerned with current conditions such as a weather icon and text
 */
export interface Conditions {
  text: string;
  icon: string;
}

/**
 * A collection of weather alerts.
 * This interface is designed to hold an array of `Alert` objects,
 * each representing specific weather alert information.
 */
export interface Alerts {
  alert: Alert[];
}

/**
 * Represents Weather Alert information
 */
export interface Alert {
  headline: string;
  event: string;
  category: string;
  desc?: string;
  effective: string;
  expires: string;
  certainty?: string;
}
