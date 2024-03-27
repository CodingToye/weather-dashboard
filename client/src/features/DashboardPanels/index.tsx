import React from 'react';
import { DashboardPanelsProps, ForecastHour } from '../../types/types';
import HeroPanel from './HeroPanel';
import ForecastPanel from './ForecastPanel';
import WindPanel from './WindPanel';
import RainPanel from './RainPanel';
import SnowPanel from './SnowPanel';
import UVPanel from './UVPanel';
import CloudPanel from './CloudPanel';
import HumidityPanel from './HumidityPanel';

const DashboardPanels: React.FC<DashboardPanelsProps> = ({
    searchedLocation,
    colorTheme,
    tempUnit,
    speedUnit,
    measurementUnit,
}) => {
    const { current, forecast } = searchedLocation || {};
    const { humidity } = current || {};

    if (!forecast) {
        return null; // or render a loading indicator
    }

    return (
        <>
            <div
                className='grid lg:grid-cols-2 gap-8 w-full'
                data-testid='dashboard-panels-test'
            >
                <div className='flex flex-col grow gap-8 order-1'>
                    {searchedLocation && (
                        <HeroPanel
                            searchedLocation={searchedLocation}
                            tempUnit={tempUnit}
                            forecast={forecast}
                            colorTheme={colorTheme}
                        />
                    )}
                    <div className='grid lg:grid-cols-4 gap-8'>
                        {searchedLocation && forecast && (
                            <>
                                <CloudPanel
                                    searchedLocation={searchedLocation}
                                    colorTheme={colorTheme}
                                />
                                {humidity && (
                                    <HumidityPanel
                                        humidity={humidity}
                                        colorTheme={colorTheme}
                                    />
                                )}

                                <RainPanel
                                    forecast={forecast}
                                    searchedLocation={searchedLocation}
                                    measurementUnit={measurementUnit}
                                    colorTheme={colorTheme}
                                />
                                <SnowPanel
                                    forecast={forecast}
                                    searchedLocation={searchedLocation}
                                    colorTheme={colorTheme}
                                />
                            </>
                        )}
                    </div>
                    <div className='grid lg:grid-cols-2 gap-8'>
                        {searchedLocation && (
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
                                    speedUnit={speedUnit}
                                    colorTheme={colorTheme}
                                />
                                <UVPanel
                                    forecast={forecast}
                                    searchedLocation={searchedLocation}
                                    colorTheme={colorTheme}
                                />
                            </>
                        )}
                    </div>
                </div>
                <div className='overflow-hidden order-2'>
                    {searchedLocation && (
                        <ForecastPanel
                            forecast={forecast}
                            unit={tempUnit}
                            searchedLocation={searchedLocation}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default DashboardPanels;
