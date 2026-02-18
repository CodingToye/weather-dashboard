// src/types/types.ts

import {AirQuality} from "../features/DashboardPanels/AirQualityPanels/types";
import {Forecast} from "../features/DashboardPanels/ForecastPanels/types";
import {Alerts} from "../features/DashboardPanels/AlertsPanel/types";
/**
 * Represents a function that takes in a string to search upon.
 */
export interface SearchLocationProps {
  onSearch: (city: string) => Promise<void>;
}

export interface Location {
  name: string;
  country: string;
  region: string;
  localtime: string;
  lat?: number;
  lon?: number;
  tz_id?: string;
}

export interface Current {
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
  air_quality?: AirQuality;
}

/**
 * Represents a forecast day and holds an array of day objects via ForecastDay
 */

export interface SearchError {
  code: number;
  message: string;
}

export interface SearchedLocation {
  current: Current;
  location: Location;
  forecast: Forecast;
  alerts: Alerts;
  error?: SearchError;
}

/**
 * Represents data regarding a forecast day, as well as holding an array for data concerned with the hour
 */

/**
 * Represents all data that is concerned with hourly updates,
 * as well as the Conditions data object
 */

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
