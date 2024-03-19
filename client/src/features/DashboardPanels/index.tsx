import React from 'react';
import { DashboardPanelsProps } from '../../types/types';

const DashboardPanels: React.FC<DashboardPanelsProps> = ({
    searchedLocation,
}) => {
    const { location, current } = searchedLocation || {};
    const { temp_c, wind_mph } = current || {};
    const { text, icon } = current?.condition || {};
    return (
        <section data-testid='dashboard-panels-test'>
            <div>
                <h1>Current City: {location?.name}</h1>
                <p>Current temperature: {temp_c}c</p>
                <p>Wind speed: {wind_mph}mph</p>
            </div>
            <div>
                <h2>Conditions:</h2>
                <p>{text}</p>
                <img src={icon} alt='icon' />
            </div>
        </section>
    );
};

export default DashboardPanels;
