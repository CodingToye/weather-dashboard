import WeeklyForecast from './WeeklyForecast';
import HourlyForecast from './HourlyForecast';
import { Forecast, CurrentWeather } from '../../types/types';

interface ForecastProps {
    searchedLocation: CurrentWeather;
    forecast: Forecast | undefined;
    unit: string;
}

const ForecastPanel: React.FC<ForecastProps> = ({
    forecast,
    unit,
    searchedLocation,
}) => {
    return (
        <>
            <div className=' c-panel flex flex-col gap-4'>
                {/* <h4>7 Day Forecast</h4> */}
                {forecast && (
                    <>
                        {searchedLocation && (
                            <HourlyForecast
                                forecast={forecast}
                                unit={unit}
                                location={searchedLocation?.location}
                            />
                        )}

                        <WeeklyForecast forecast={forecast} unit={unit} />
                    </>
                )}
            </div>
        </>
    );
};

export default ForecastPanel;
