import React, { useState, useEffect } from 'react';

import SearchLocation from './features/SearchLocation';
import DashboardPanels from './features/DashboardPanels';
import AstroPanels from './features/AstroPanels';
import { CurrentWeather } from './types/types';
import './App.css';

function App() {
    const [weatherData, setWeatherData] = useState<CurrentWeather | null>(null);

    useEffect(() => {
        fetchWeather('New York');
    }, []);

    const fetchWeather = async (city: string) => {
        try {
            const timestamp = Date.now();
            const currentResponse = await fetch(
                `http://localhost:5000/api/current?city=${city}&_=${timestamp}`
            );
            if (currentResponse.ok) {
                const currentData = await currentResponse.json();
                setWeatherData(currentData);
            } else {
                console.error(
                    'Failed to fetch currentweather data:',
                    currentResponse.statusText
                );
            }

            const forecastResponse = await fetch(
                `http://localhost:5000/api/forecast?city=${city}&_=${timestamp}`
            );
            if (forecastResponse.ok) {
                const forecastData = await forecastResponse.json();
                console.log(forecastData);
                setWeatherData((prevData) => {
                    if (!prevData) {
                        return null;
                    }
                    return {
                        ...prevData,
                        forecast: forecastData.forecast,
                    };
                });
            } else {
                console.error(
                    'Failed to fetch forecasted weather data:',
                    forecastResponse.statusText
                );
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const handleSearch = (city: string) => {
        fetchWeather(city);
    };

    const currentDate = new Date();
    console.log(typeof currentDate);
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <>
            <div className='flex gap-4' data-testid='app-test'>
                {/* <aside className='bg-color3 rounded-lg p-2'>Toolbar</aside> */}
                <main className='flex flex-col gap-4 grow overflow-hidden'>
                    <header className='flex gap-4 justify-between'>
                        <div className='flex gap-4'>
                            <img
                                src='https://mdbcdn.b-cdn.net/img/new/avatars/2.webp'
                                className='rounded-full w-12 h-fit'
                            />
                            <div className='flex flex-col justify-center'>
                                <small>Hi Nick</small>
                                <h4>{formattedDate}</h4>
                            </div>
                        </div>
                        <SearchLocation onSearch={handleSearch} />
                    </header>
                    <section className=''>
                        <DashboardPanels
                            searchedLocation={weatherData || null}
                        />
                    </section>
                </main>
                <aside className='flex flex-col gap-4'>
                    <section>
                        <AstroPanels searchedLocation={weatherData || null} />
                    </section>
                </aside>
            </div>
        </>
    );
}

export default App;
