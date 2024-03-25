import PieChance from '../../components/PieChance';
import { Forecast, CurrentWeather } from '../../types/types';

interface ForecastProps {
    searchedLocation: CurrentWeather;
    forecast: Forecast | undefined;
}

const SnowPanel: React.FC<ForecastProps> = ({ forecast }) => {
    const chanceOfSnow =
        forecast?.forecastday[0]?.day.daily_chance_of_snow ?? 0;
    const data = [
        { name: 'Chance of Rain', value: chanceOfSnow },
        { name: 'Remaining', value: 100 - chanceOfSnow },
    ];

    return (
        <section className=' c-panel flex flex-col gap-8 items-center justify-between'>
            <h1>Snow chance</h1>
            <PieChance data={data} />
        </section>
    );
};

export default SnowPanel;
