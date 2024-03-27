import React from 'react';
import { Forecast, ForecastHour, CurrentWeather } from '../../types/types';
import { getHour } from '../../utils/dates.utils';
import Panel from '../../containers/Panel';

interface HourlyForecastProps {
    forecast: Forecast;
    unit: string;
    location: CurrentWeather['location'];
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({
    forecast,
    unit,
    location,
}) => {
    if (forecast.forecastday.length === 0) {
        return null;
    }

    // Get the local time from the location
    const localTime = location?.localtime;

    // Find the index of the current hour in the forecast data
    let currentIndex = -1;
    if (localTime) {
        const currentHour = getHour(localTime, false);
        currentIndex = forecast.forecastday[0].hour.findIndex(
            (hour: ForecastHour) => getHour(hour.time, false) === currentHour
        );
    }

    // Reorder the forecast data starting from the current hour
    const reorderedHourlyForecast = [
        ...forecast.forecastday[0].hour.slice(currentIndex),
        ...forecast.forecastday[0].hour.slice(0, currentIndex),
    ];

    // console.log(localTime);

    return (
        <>
            <Panel extraClasses='overflow-hidden'>
                <header className='mb-0'>
                    <h1>Forecast</h1>
                </header>
                <div className='flex gap-2 py-4 overflow-x-auto no-scrollbar'>
                    {reorderedHourlyForecast.length ? (
                        reorderedHourlyForecast.map(
                            (hour: ForecastHour, j: number) => (
                                <div
                                    key={j}
                                    className={`flex flex-col justify-between gap-4 items-center shrink-0 w-24 text-white ${
                                        j === 0
                                            ? 'bg-primary'
                                            : 'bg-neutral-darkGrey dark:bg-neutral-darkGrey/30 border'
                                    } rounded-lg p-4 border-white/20  border-dashed`}
                                >
                                    <span
                                        className={`text-sm ${
                                            getHour(localTime, false) !==
                                                getHour(hour.time, false) &&
                                            'lowercase'
                                        } ${
                                            j === 0
                                                ? 'text-white dark:text-white'
                                                : 'text-white dark:text-white'
                                        }`}
                                    >
                                        {getHour(localTime, false) ===
                                        getHour(hour.time, false)
                                            ? 'Now'
                                            : getHour(hour.time, false)}
                                    </span>
                                    <img
                                        src={hour.condition.icon}
                                        alt='icon'
                                        className='w-16'
                                    />
                                    <span className='text-xs'>
                                        {Math.round(
                                            unit === 'C'
                                                ? hour.temp_c
                                                : hour.temp_f
                                        )}
                                        &deg;{unit}
                                    </span>
                                </div>
                            )
                        )
                    ) : (
                        <div>No hourly forecast available for this day</div>
                    )}
                </div>
            </Panel>
        </>
    );
};

export default HourlyForecast;
