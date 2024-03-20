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

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <>
            <div className='flex gap-4' data-testid='app-test'>
                <aside className='bg-color3 rounded-lg p-2'>Toolbar</aside>
                <main className='flex flex-col gap-4 grow'>
                    <header className='flex gap-4 justify-between'>
                        <div className='flex gap-4'>
                            <img
                                src='https://mdbcdn.b-cdn.net/img/new/avatars/2.webp'
                                className='rounded-full w-12 h-fit'
                            />
                            <div className='flex flex-col justify-center'>
                                <small>Hi Nick</small>
                                <h3>{formattedDate}</h3>
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
                    <div className='flex'>
                        <div>Unit switcher</div>
                    </div>
                    <div className='rounded-lg bg-color3 p-3'>Other stuff</div>
                </aside>
            </div>
        </>
    );
}

export default App;
