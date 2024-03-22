import fetch from 'node-fetch';

async function fetchWeatherData(city, mode) {
    const apiKey = process.env.WEATHER_API_KEY;
    const apiUrl = `https://api.weatherapi.com/v1/${mode}.json?key=${apiKey}&q=${city}&days=3`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}

export default fetchWeatherData;
