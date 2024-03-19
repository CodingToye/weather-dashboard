import fetch from 'node-fetch';

async function fetchWeatherData(city) {
    const apiKey = '7df23f028709415097b155924241903';
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

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
