import { Forecast, CurrentWeather, ForecastHour } from '../../types/types';
import TemperaturePanel from './TemperaturePanel';

interface HeroPanelProps {
    searchedLocation: CurrentWeather;
    forecast: Forecast | undefined;
    unit: string;
}

const HeroPanel: React.FC<HeroPanelProps> = ({
    searchedLocation,
    unit,
    forecast,
}) => {
    const { current, location } = searchedLocation || {};
    const { temp_c, temp_f, feelslike_c, feelslike_f } = current || {};
    const { icon, text } = current?.condition || {};
    const { forecastday } = forecast || {};
    return (
        <>
            <div className=' c-panel grid grid-cols-2 gap-4'>
                <section className=' flex flex-col items-start gap-1'>
                    <div className='flex flex-col items-center mb-4'>
                        <img src={icon} alt='icon' className='w-20' />
                        <span className='text-xs text-color2/50'>{text}</span>
                    </div>
                    <span className='text-4xl mb-4'>
                        {unit === 'C' ? temp_c : temp_f}&deg;{unit}
                        <span className='text-xs ml-4 text-color2/50'>
                            Feels like{' '}
                            {unit === 'C' ? feelslike_c : feelslike_f}&deg;
                            {unit}
                        </span>
                    </span>
                    <div>
                        <h1 className='text-2xl'>{location.name}</h1>
                        <small>
                            {location.region}, {location.country}
                        </small>
                    </div>
                </section>
                <section>
                    <TemperaturePanel
                        unit={unit}
                        forecastHour={[
                            forecastday?.[0]?.hour?.[6] as ForecastHour,
                            forecastday?.[0]?.hour?.[12] as ForecastHour,
                            forecastday?.[0]?.hour?.[18] as ForecastHour,
                            forecastday?.[0]?.hour?.[0] as ForecastHour,
                        ]}
                    />
                </section>
            </div>
        </>
    );
};

export default HeroPanel;
