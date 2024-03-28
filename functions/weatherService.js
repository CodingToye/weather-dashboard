const fetch = require("node-fetch");
/**
 * Fetches weather data for a given city and mode.
 * @param {string} city - The name of the city.
 * @param {string} mode - The mode of data to fetch (e.g., current, forecast)
 * @return {Promise<Object>} - A promise that resolves to the weather data.
 */
async function fetchWeatherData(city, mode) {
  const apiKey = process.env.WEATHER_API_KEY;
  const apiUrl = `https://api.weatherapi.com/v1/${mode}.json?key=${apiKey}&q=${city}&days=7`;

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