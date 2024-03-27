import { Forecast, CurrentWeather, ForecastHour } from '../../types/types';
import TemperaturePanel from './TemperaturePanel';

interface HeroPanelProps {
    searchedLocation: CurrentWeather;
    forecast: Forecast | undefined;
    tempUnit: string;
    colorTheme: string;
}

const HeroPanel: React.FC<HeroPanelProps> = ({
    searchedLocation,
    tempUnit,
    forecast,
    colorTheme,
}) => {
    const { current, location } = searchedLocation || {};
    const { temp_c, temp_f, feelslike_c, feelslike_f } = current || {};
    const { icon, text } = current?.condition || {};
    const { forecastday } = forecast || {};
    return (
        <>
            <div className='c-panel grow grid lg:grid-cols-2 gap-4 '>
                <section className='flex flex-col items-center lg:items-start'>
                    <div className='flex flex-col flex-wrap lg:flex-nowrap items-center lg:items-start mb-8 lg:mg-0 gap-4'>
                        <div className='w-full text-center lg:text-left'>
                            <h1 className='text-2xl'>{location.name}</h1>
                            <small className='text-neutral-darkGrey/50 dark:text-white/50'>
                                {location.region}, {location.country}
                            </small>
                        </div>
                        <div className='flex flex-col items-center mb-4'>
                            <img src={icon} alt='icon' className='w-20' />
                            <span className='text-xs text-neutral-darkGrey/50 dark:text-white/50'>
                                {text}
                            </span>
                        </div>
                        <span className='text-4xl mb-4 grow'>
                            {tempUnit === 'C' ? temp_c : temp_f}&deg;{tempUnit}
                            <span className='text-xs lg:ml-4 text-neutral-darkGrey/50 dark:text-white/50 block lg:inline'>
                                Feels like{' '}
                                {tempUnit === 'C' ? feelslike_c : feelslike_f}
                                &deg;
                                {tempUnit}
                            </span>
                        </span>
                    </div>
                </section>
                <section className=''>
                    <TemperaturePanel
                        unit={tempUnit}
                        forecastHour={[
                            forecastday?.[0]?.hour?.[6] as ForecastHour,
                            forecastday?.[0]?.hour?.[12] as ForecastHour,
                            forecastday?.[0]?.hour?.[18] as ForecastHour,
                            forecastday?.[0]?.hour?.[0] as ForecastHour,
                        ]}
                        colorTheme={colorTheme}
                    />
                </section>
            </div>
        </>
    );
};

export default HeroPanel;
