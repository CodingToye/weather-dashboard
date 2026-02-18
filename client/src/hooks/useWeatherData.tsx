// src/hooks/useWeatherData.tsx

import {useState, useCallback} from "react";

import {SearchedLocation} from "../types/types";

const defaultWeatherData: SearchedLocation = {
  current: {
    temp_c: 0,
    temp_f: 0,
    feelslike_c: 0,
    feelslike_f: 0,
    wind_mph: 0,
    wind_kph: 0,
    wind_dir: "",
    wind_degree: 0,
    humidity: 0,
    condition: {
      text: "",
      icon: "",
    },
    uv: 0,
    cloud: 0,
  },
  location: {
    name: "",
    country: "",
    region: "",
    localtime: "",
    lat: 0,
    lon: 0,
  },
  forecast: {
    forecastday: [],
  },
  alerts: {
    alert: [],
  },
};

function useWeatherData() {
  const [weatherData, setWeatherData] = useState<SearchedLocation | null>(null);
  const fetchWeatherData = useCallback(async (city: string) => {
    try {
      const fetchData = async (apiUrl: string) => {
        const response = await fetch(apiUrl);
        if (!response.ok)
          throw new Error("Failed to fetch data from ${apiUrl}");
        return response.json();
      };

      const timestamp = Date.now();
      const apiUrlBase = process.env.REACT_APP_API_URL;
      const currentApiUrl = `${apiUrlBase}/current?city=${city}&_=${timestamp}`;
      const forecastApiUrl = `${apiUrlBase}/forecast?city=${city}&_=${timestamp}`;

      const [currentData, forecastData] = await Promise.all([
        fetchData(currentApiUrl),
        fetchData(forecastApiUrl),
      ]);

      setWeatherData({
        ...defaultWeatherData,
        ...currentData,
        forecast: forecastData.forecast,
        alerts: forecastData.alerts,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }, []);
  return {weatherData, fetchWeatherData};
}

export default useWeatherData;
