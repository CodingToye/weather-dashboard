import React from 'react';

import Icon from '../../components/Icon';

import { Forecast, ForecastDay } from '../../types/types';

interface AllForecastDatesProps {
    forecast: Forecast;
    unit: string;
}

const getDay = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', {
        weekday: 'long',
    });
};

const AllForecastDates: React.FC<AllForecastDatesProps> = ({
    forecast,
    unit,
}) => {
    return (
        <>
            {forecast.forecastday.map((x: ForecastDay, i: number) => (
                <div
                    key={i}
                    className='flex flex-col gap-4 items-center bg-color1/30 text-color2 rounded-lg py-4 border-color2/20 border border-dashed'
                >
                    <h3 className='text-color6'>{getDay(x.date)}</h3>
                    <img
                        src={x.day.condition.icon}
                        alt='icon'
                        className='w-16'
                    />
                    <div className='flex flex-row justify-between items-center w-full p-4 mb-4'>
                        <small>
                            min{' '}
                            {Math.round(
                                unit === 'C' ? x.day.mintemp_c : x.day.mintemp_f
                            )}
                            &deg;{unit}
                        </small>
                        <Icon iconName='thermostat' />
                        <small>
                            max{' '}
                            {Math.round(
                                unit === 'C' ? x.day.maxtemp_c : x.day.mintemp_f
                            )}
                            &deg;{unit}
                        </small>
                    </div>
                    <div className='flex flex-col gap-1 w-full px-4'>
                        <small
                            className={`flex items-center ${
                                x.day.daily_chance_of_rain > 50
                                    ? 'text-color7'
                                    : ''
                            }`}
                        >
                            <Icon
                                iconName='humidity_high'
                                extraClasses='mr-2 text-sm'
                            />
                            Chance of rain: {x.day.daily_chance_of_rain}%
                        </small>
                        <small
                            className={`flex items-center ${
                                x.day.daily_chance_of_snow ? 'text-white' : ''
                            }`}
                        >
                            <Icon
                                iconName='weather_snowy'
                                extraClasses='mr-2 text-sm'
                            />
                            Chance of snow: {x.day.daily_chance_of_snow}%
                        </small>
                    </div>
                </div>
            ))}
        </>
    );
};

export default AllForecastDates;
