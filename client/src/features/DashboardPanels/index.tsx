import React, { useState } from 'react';
import { DashboardPanelsProps } from '../../types/types';
import AllForecastDates from './AllForecastDates';
import HourlyForecast from './HourlyForecast';
// import LocalMap from './LocalMap';
import UnitSwitcher from './UnitSwitcher';

import GaugeChart from 'react-gauge-chart';

const getTime = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });
};

const DashboardPanels: React.FC<DashboardPanelsProps> = ({
    searchedLocation,
}) => {
    const { location, current, forecast } = searchedLocation || {};
    const { temp_c, temp_f, wind_mph, humidity } = current || {};
    const { icon } = current?.condition || {};
    // const lat = location?.lat ?? 0;
    // const lon = location?.lon ?? 0;

    const [unit, setUnit] = useState('C');

    const handleUnitChange = (newUnit: string) => {
        setUnit(newUnit);
    };

    const humidityDec = humidity ? humidity / 100 : 0;

    return (
        <section
            className='flex flex-col gap-4'
            data-testid='dashboard-panels-test'
        >
            <div className='c-panel'>
                <div className='grid grid-cols-localWeather gap-2 items-center'>
                    <img src={icon} alt='icon' className='mr-4' />
                    <div className='flex flex-col'>
                        <h2>{location?.name}</h2>
                        <small>{location?.country}</small>
                        <small>
                            Local time:{' '}
                            {location?.localtime
                                ? getTime(location?.localtime)
                                : ''}
                        </small>
                    </div>
                    <div className='flex flex-col'>
                        <h2>
                            {unit === 'C' ? temp_c : temp_f}&deg;
                            <small>{unit}</small>
                        </h2>
                        <small>Temperature</small>
                    </div>
                    <div className='flex flex-col'>
                        <h2>
                            {humidity}
                            <small>%</small>
                        </h2>
                        <small>Humidity</small>
                    </div>
                    <div className='flex flex-col'>
                        <h2>
                            {wind_mph}
                            <small>mp/h</small>
                        </h2>
                        <small>Wind speed</small>
                    </div>
                    <div className='flex'>
                        <UnitSwitcher
                            unit={unit}
                            onUnitChange={handleUnitChange}
                        />
                    </div>
                </div>
            </div>
            <div className='flex'>
                <div className='c-panel'>
                    <h4>Humidity</h4>
                    <GaugeChart
                        id='humidity-chart'
                        nrOfLevels={30}
                        colors={['#f2651d']}
                        needleColor={'#1e1f24'}
                        needleBaseColor={'#1e1f24'}
                        arcWidth={0.1}
                        percent={humidityDec}
                    />
                </div>
            </div>
            <div className='c-panel'>
                <>
                    <h4>24 Hours</h4>
                    {forecast && searchedLocation && (
                        <HourlyForecast
                            forecast={forecast}
                            unit={unit}
                            location={searchedLocation?.location}
                        />
                    )}
                </>
            </div>
            <div className='c-panel'>
                <>
                    <h4>3 Day Forecast</h4>
                    {forecast && (
                        <div className='grid grid-cols-3 gap-4 py-4'>
                            <AllForecastDates forecast={forecast} unit={unit} />
                            {/* <div className='grayscale bg-color1/30 text-color2 rounded-lg p-4 border-color2/20 border border-dashed'>
                                <LocalMap lat={lat} lng={lon} />
                            </div> */}
                        </div>
                    )}
                </>
            </div>
        </section>
    );
};

export default DashboardPanels;
