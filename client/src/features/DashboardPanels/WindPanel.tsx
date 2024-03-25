import { ForecastDay, ForecastHour, CurrentWeather } from '../../types/types';
import {
    getToday,
    getHour,
    getHourLabel,
    getCurrentHourLabel,
} from '../../utils/dates.utils';

import {
    ComposedChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ReferenceLine,
} from 'recharts';

interface WindPanelProps {
    forecastHour: ForecastHour[];
    searchedLocation: CurrentWeather;
}

const CustomTooltip = ({ payload, label, unit }: any) => {
    return (
        <div className='bg-color6 px-4 py-1 rounded shadow-lg'>
            <p className='text-xs'>
                {`${label}: ${payload[0]?.value}`}
                {`${unit}`}
            </p>
        </div>
    );
};

const WindPanel: React.FC<WindPanelProps> = ({
    forecastHour,
    searchedLocation,
}) => {
    const { location, current } = searchedLocation || {};

    const localTime = location?.localtime;
    const currentHour = getHour(localTime, false);
    const currentHourLabel = getCurrentHourLabel(currentHour);

    const data = forecastHour.map((hour) => {
        const hourLabel = getHourLabel(hour.time);
        return {
            name: hourLabel,
            wind: hour.wind_mph,
        };
    });

    return (
        <section className='c-panel'>
            <header>
                <h1>Wind</h1>
                <span className='text-xs text-white/50'>
                    Current wind speed: {current.wind_mph}mp/h
                </span>
            </header>

            <ComposedChart
                width={300}
                height={150}
                data={data}
                margin={{
                    top: 20,
                    right: 10,
                    bottom: 30,
                    left: 0,
                }}
                className='u-recharts-fix-overflow u-recharts-fix-overflow-tick'
            >
                <defs>
                    <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
                        <stop
                            offset='5%'
                            stopColor='#f2651d'
                            stopOpacity={0.8}
                        />
                        <stop
                            offset='95%'
                            stopColor='#f2651d'
                            stopOpacity={0}
                        />
                    </linearGradient>
                </defs>
                <CartesianGrid
                    strokeDasharray='3 3'
                    stroke='#f2651d'
                    strokeOpacity={0.2}
                    horizontal={true}
                />
                <YAxis hide />
                <XAxis
                    dataKey='name'
                    height={10}
                    tickLine={false}
                    axisLine={false}
                    tick={false}
                    label={{
                        value: 'mp/h over the day',
                        fontSize: '10px',
                        position: 'insideBottom',
                        offset: -10,
                    }}
                />
                <ReferenceLine
                    x={currentHourLabel}
                    stroke='rgba(255,255,255,.5)'
                    strokeDasharray='3 3'
                />
                <Tooltip content={<CustomTooltip unit='mp/h' />} />
                <Area
                    type='natural'
                    dataKey='wind'
                    fill='url(#colorUv)'
                    stroke='none'
                    dot={{ fill: 'white' }}
                />
            </ComposedChart>
        </section>
    );
};

export default WindPanel;
