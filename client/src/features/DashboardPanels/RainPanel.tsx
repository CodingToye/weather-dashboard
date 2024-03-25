import PieChance from '../../components/PieChance';
import { Forecast, CurrentWeather } from '../../types/types';

interface ForecastProps {
    searchedLocation: CurrentWeather;
    forecast: Forecast | undefined;
}

const RainPanel: React.FC<ForecastProps> = ({ forecast }) => {
    const chanceOfRain =
        forecast?.forecastday[0]?.day.daily_chance_of_rain ?? 0;
    const data = [
        { name: 'Chance of Rain', value: chanceOfRain },
        { name: 'Remaining', value: 100 - chanceOfRain },
    ];

    return (
        <section className=' c-panel flex flex-col gap-8 items-center justify-between'>
            <h1>Rain chance</h1>
            <PieChance data={data} />
        </section>
    );
};

export default RainPanel;
