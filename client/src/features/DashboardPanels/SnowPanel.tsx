import Panel from '../../containers/Panel';

import PieChance from '../../components/PieChance';
import Icon from '../../components/Icon';
import { Forecast, CurrentWeather } from '../../types/types';

interface ForecastProps {
    searchedLocation: CurrentWeather;
    forecast: Forecast | undefined;
    colorTheme: string;
}

const SnowPanel: React.FC<ForecastProps> = ({ forecast, colorTheme }) => {
    const totalSnow = forecast?.forecastday[0]?.day.totalsnow_cm;
    const chanceOfSnow =
        forecast?.forecastday[0]?.day.daily_chance_of_snow ?? 0;
    const data = [
        { name: 'Chance of Rain', value: chanceOfSnow },
        { name: 'Remaining', value: 100 - chanceOfSnow },
    ];

    return (
        <Panel flexDirection='col' itemsCentered>
            <div className='flex flex-col items-center'>
                <header className='mb-2'>
                    <h1 className='text-sm'>Snow chance</h1>
                </header>
                <div className='flex items-center text-neutral-darkGrey/50 dark:text-white/50'>
                    <Icon
                        iconName='weather_snowy'
                        extraClasses='mr-2 text-base'
                    />
                    <span className='text-xs'>{totalSnow}cm</span>
                </div>
            </div>
            <PieChance data={data} colorTheme={colorTheme} />
        </Panel>
    );
};

export default SnowPanel;
