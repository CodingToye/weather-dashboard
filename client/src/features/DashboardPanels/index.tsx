import React from 'react';
import { DashboardPanelsProps } from '../../types/types';

const DashboardPanels: React.FC<DashboardPanelsProps> = ({
    searchedLocation,
}) => {
    const { location, current } = searchedLocation || {};
    const { temp_c, wind_mph, humidity } = current || {};
    const { icon } = current?.condition || {};
    return (
        <section
            className='flex flex-col gap-4'
            data-testid='dashboard-panels-test'
        >
            <div className='c-panel'>
                <div className='grid grid-cols-5 gap-2 items-center'>
                    <img src={icon} alt='icon' />
                    <div className='flex flex-col'>
                        <h2>{location?.name}</h2>
                        <small>{location?.country}</small>
                    </div>
                    <div className='flex flex-col'>
                        <h2>
                            {temp_c}
                            <small>c</small>
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
                </div>
            </div>
            <div className='c-panel'>
                <h2>3 Day Forecast</h2>
            </div>
        </section>
    );
};

export default DashboardPanels;
