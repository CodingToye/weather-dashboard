const functions = require("firebase-functions");
const fetch = require("node-fetch");

async function fetchWeatherData(city, mode, includeAlerts = false) {
  console.log("Fetching weather data for city:", city);

  const apiKey = functions.config().weather.key; // still works, but migrate to params later
  let apiUrl = `https://api.weatherapi.com/v1/${mode}.json?key=${apiKey}&q=${city}&days=5`;
  if (includeAlerts) apiUrl += "&alerts=yes";

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}

module.exports = fetchWeatherData;
