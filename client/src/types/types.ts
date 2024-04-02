export interface CurrentWeather {
  location: {
    name: string;
    country: string;
    region: string;
    localtime: string;
    lat: number;
    lon: number;
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
}

export interface Forecast {
  forecastday: ForecastDay[];
  // forecasthour: ForecastHour[];
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

export interface Conditions {
  text: string;
  icon: string;
}

export interface SearchLocationProps {
  /** The location the user wishes to search. */
  onSearch: (city: string) => void;
}

export interface DashboardPanelsProps {
  searchedLocation: CurrentWeather | null;
  forecast?: Forecast | undefined;
  fetchWeather: (city: string) => Promise<void>;
  colorTheme: string;
  tempUnit: string;
  speedUnit: string;
  measurementUnit: string;
}

export interface HeroPanelprops {
  searchedLocation: CurrentWeather | null;
}

export interface AstroPanelProps {
  searchedLocation: CurrentWeather | null;
}

export interface Astro {
  sunrise: string;
  sunset: string;
}

export interface TemperaturePanelProps {
  unit: string;
  forecastHour: ForecastHour[];
  colorTheme: string;
}

export interface TooltipPayload {
  value?: string | number;
}

export interface CustomTooltipProps {
  payload?: TooltipPayload[];
  label?: string;
  unit?: string;
}

export interface UVProps {
  searchedLocation: CurrentWeather;
  forecast: Forecast;
  colorTheme: string;
}

export interface WindPanelProps {
  forecastHour: ForecastHour[];
  searchedLocation: CurrentWeather;
  speedUnit: string;
  colorTheme: string;
}
