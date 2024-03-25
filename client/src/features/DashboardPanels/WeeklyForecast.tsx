import React from 'react';
import { getDay, getShortDate } from '../../utils/dates.utils';

import { Forecast, ForecastDay } from '../../types/types';

interface WeeklyForecastProps {
    forecast: Forecast;
    unit: string;
}

const WeeklyForecast: React.FC<WeeklyForecastProps> = ({ forecast, unit }) => {
    const weeklyForecast = forecast.forecastday.slice(1);
    return (
        <>
            <section>
                <div className='flex flex-col items-start gap-2 h-full'>
                    {weeklyForecast.map((x: ForecastDay, i: number) => (
                        <div
                            key={i}
                            className=' flex flex-row gap-4 w-full items-center justify-between bg-color3 text-color2 rounded-lg py-4 '
                        >
                            <div className=' grow'>
                                <h3 className='text-color2 text-base'>
                                    {i === 0
                                        ? 'Tomorrow'
                                        : getDay(x.date, false)}
                                </h3>
                                <span className='text-sm text-color2/50'>
                                    {getShortDate(x.date)}
                                </span>
                            </div>
                            <span className='debug  text-2xl text-color2/75'>
                                {Math.round(
                                    unit === 'C'
                                        ? x.day.avgtemp_c
                                        : x.day.avgtemp_f
                                )}
                                &deg;{unit}
                            </span>
                            <img
                                src={x.day.condition.icon}
                                alt='icon'
                                className='w-16'
                            />
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default WeeklyForecast;
