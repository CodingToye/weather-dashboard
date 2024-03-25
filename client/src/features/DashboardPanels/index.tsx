import React, { useState } from 'react';
import {
    DashboardPanelsProps,
    Forecast,
    ForecastHour,
} from '../../types/types';
import HeroPanel from './HeroPanel';
import ForecastPanel from './ForecastPanel';
import WindPanel from './WindPanel';
import RainPanel from './RainPanel';
import SnowPanel from './SnowPanel';
import UVPanel from './UVPanel';
import CloudPanel from './CloudPanel';
import HumidityPanel from './HumidityPanel';

import { getTime } from '../../utils/dates.utils';
import HourlyForecast from './HourlyForecast';
// import LocalMap from './LocalMap';
import UnitSwitcher from './UnitSwitcher';

const DashboardPanels: React.FC<DashboardPanelsProps> = ({
    searchedLocation,
}) => {
    const { location, current, forecast } = searchedLocation || {};
    const { temp_c, temp_f, wind_mph, wind_degree, humidity } = current || {};
    const { icon } = current?.condition || {};
    // const lat = location?.lat ?? 0;
    // const lon = location?.lon ?? 0;

    const [unit, setUnit] = useState('C');

    const handleUnitChange = (newUnit: string) => {
        setUnit(newUnit);
    };

    return (
        <>
            <div
                className='grid grid-cols-2 gap-8'
                data-testid='dashboard-panels-test'
            >
                <div className='flex flex-col gap-8'>
                    {searchedLocation && (
                        <HeroPanel
                            searchedLocation={searchedLocation}
                            unit={unit}
                            forecast={forecast}
                        />
                    )}
                    <div className=' grid grid-cols-2 gap-8'>
                        {searchedLocation && forecast && (
                            <>
                                <WindPanel
                                    searchedLocation={searchedLocation}
                                    forecastHour={
                                        [
                                            forecast?.forecastday[0]?.hour[6],
                                            forecast?.forecastday[0]?.hour[12],
                                            forecast?.forecastday[0]?.hour[18],
                                            forecast?.forecastday[0]?.hour[0],
                                        ].filter(Boolean) as ForecastHour[]
                                    }
                                />
                                <div className='grid grid-cols-2 gap-8'>
                                    <RainPanel
                                        forecast={forecast}
                                        searchedLocation={searchedLocation}
                                    />
                                    <SnowPanel
                                        forecast={forecast}
                                        searchedLocation={searchedLocation}
                                    />
                                </div>
                            </>
                        )}
                        {searchedLocation && (
                            <UVPanel searchedLocation={searchedLocation} />
                        )}
                        <CloudPanel />
                        {humidity && <HumidityPanel humidity={humidity} />}
                        <div className='c-panel'>Another Panel...</div>
                    </div>
                </div>
                <div>
                    {searchedLocation && (
                        <ForecastPanel
                            forecast={forecast}
                            unit={unit}
                            searchedLocation={searchedLocation}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default DashboardPanels;
