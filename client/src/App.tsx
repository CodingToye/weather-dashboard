import React, { useState, useEffect } from 'react';
import SearchLocation from './features/SearchLocation';
import DashboardPanels from './features/DashboardPanels';
import { WeatherData } from './types/types';
import './App.css';

function App() {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

    useEffect(() => {
        fetchWeather('New York');
    }, []);

    const fetchWeather = async (city: string) => {
        try {
            const timestamp = Date.now();
            const response = await fetch(
                `http://localhost:5000/api/weather?city=${city}&_=${timestamp}`
            );
            if (response.ok) {
                const data = await response.json();
                setWeatherData(data);
            } else {
                console.error(
                    'Failed to fetch weather data:',
                    response.statusText
                );
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const handleSearch = (city: string) => {
        fetchWeather(city);
    };

    return (
        <div className='App' data-testid='app-test'>
            <SearchLocation onSearch={handleSearch} />
            <DashboardPanels searchedLocation={weatherData || null} />
        </div>
    );
}

export default App;
