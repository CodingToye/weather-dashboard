import fetch from "node-fetch";
import * as functions from "firebase-functions/v2";

async function fetchWeatherData(city, mode, includeAlerts = false) {
  const apiKey = functions.params.get("weather.key");
  let apiUrl = `https://api.weatherapi.com/v1/${mode}.json?key=${apiKey}&q=${city}&aqi=yes&tides=yes&days=5`;

  if (includeAlerts) {
    apiUrl += "&alerts=yes";
  }

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}

export default fetchWeatherData;
