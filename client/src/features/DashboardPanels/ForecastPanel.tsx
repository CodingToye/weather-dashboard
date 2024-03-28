import WeeklyForecast from './WeeklyForecast';
import HourlyForecast from './HourlyForecast';
import Panel from '../../containers/Panel';
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
            <div className='flex h-full flex-col gap-8 justify-between overflow-hidden'>
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
