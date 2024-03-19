import express from 'express';
import fetchWeatherData from '../services/weatherService.js';

export const weatherRoute = express.Router();
// Define a route handler for the /weather endpoint
weatherRoute.get('/weather', async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.status(400).json({ error: 'City parameter is required' });
    }
    try {
        const weatherData = await fetchWeatherData(city);
        res.json(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    // Handle the request and send a response
    // res.send('Weather API endpoint');
});
