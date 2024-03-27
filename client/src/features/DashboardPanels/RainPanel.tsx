import Panel from '../../containers/Panel';
import PieChance from '../../components/PieChance';
import Icon from '../../components/Icon';
import { Forecast, CurrentWeather } from '../../types/types';

interface ForecastProps {
    searchedLocation: CurrentWeather;
    forecast: Forecast | undefined;
    measurementUnit: string;
    colorTheme: string;
}

const RainPanel: React.FC<ForecastProps> = ({
    forecast,
    measurementUnit,
    colorTheme,
}) => {
    const totalPrecipitation =
        measurementUnit === 'mm'
            ? forecast?.forecastday[0]?.day.totalprecip_mm
            : forecast?.forecastday[0]?.day.totalprecip_in;
    const chanceOfRain =
        forecast?.forecastday[0]?.day.daily_chance_of_rain ?? 0;
    const data = [
        { name: 'Chance of Rain', value: chanceOfRain },
        { name: 'Remaining', value: 100 - chanceOfRain },
    ];

    return (
        <Panel itemsCentered>
            <div className='flex flex-col items-center'>
                <header className='mb-2'>
                    <h1 className='text-sm'>Rain chance</h1>
                </header>
                <div className='flex items-center text-neutral-darkGrey/50 dark:text-white/50'>
                    <Icon
                        iconName='weather_snowy'
                        extraClasses='mr-2 text-base'
                    />
                    <span className='text-xs'>
                        {totalPrecipitation}
                        {measurementUnit}
                    </span>
                </div>
            </div>
            <PieChance data={data} colorTheme={colorTheme} />
        </Panel>
    );
};

export default RainPanel;
