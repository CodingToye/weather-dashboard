const functions = require("firebase-functions");
const fetch = require("node-fetch");
/**
 * Fetches weather data for a given city and mode.
 * @param {string} city - The name of the city.
 * @param {string} mode - The mode of data to fetch (e.g., current, forecast)
 * @return {Promise<Object>} - A promise that resolves to the weather data.
 */
async function fetchWeatherData(city, mode) {
  console.log("Fetching weather data for city:", city);

  const apiKey = functions.config().weather.apikey;
  const apiUrl = `http://api.weatherapi.com/v1/${mode}.json?key=${apiKey}&q=${city}&days=5`;

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
