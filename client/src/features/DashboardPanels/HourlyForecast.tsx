import { Forecast, ForecastHour, CurrentWeather } from '../../types/types';
import { getHour } from '../../utils/dates.utils';

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
    const getLocalTime = location?.localtime ? getHour(location.localtime) : '';
    const firstDay = forecast.forecastday[0];
    return (
        <>
            <div className='flex gap-2 py-4 overflow-x-auto no-scrollbar'>
                {firstDay.hour?.length ? (
                    firstDay.hour?.map((hour: ForecastHour, j: number) => (
                        <div
                            key={j}
                            className={`flex flex-col items-center shrink-0 w-24 ${
                                getLocalTime === getHour(hour.time)
                                    ? 'bg-color6'
                                    : 'bg-color1/30 border'
                            } rounded-lg p-4 border-color2/20  border-dashed`}
                        >
                            <span
                                className={`text-lg ${
                                    getLocalTime === getHour(hour.time)
                                        ? 'text-color2'
                                        : 'text-color6'
                                } mb-4`}
                            >
                                {getHour(hour.time)}
                            </span>
                            <span className='text-xs'>
                                {Math.round(
                                    unit === 'C' ? hour.temp_c : hour.temp_f
                                )}
                                &deg;{unit}
                            </span>
                            <img
                                src={hour.condition.icon}
                                alt='icon'
                                className='w-16'
                            />
                        </div>
                    ))
                ) : (
                    <div>No hourly forecast available for this day</div>
                )}
            </div>
        </>
    );
};

export default HourlyForecast;
