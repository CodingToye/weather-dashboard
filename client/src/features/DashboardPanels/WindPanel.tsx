import Panel from '../../containers/Panel';
import Icon from '../../components/Icon';
import { ForecastDay, ForecastHour, CurrentWeather } from '../../types/types';
import {
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
    ResponsiveContainer,
} from 'recharts';

interface WindPanelProps {
    forecastHour: ForecastHour[];
    searchedLocation: CurrentWeather;
    speedUnit: string;
    colorTheme: string;
}

const CustomTooltip = ({ payload, label, unit }: any) => {
    return (
        <div className='bg-primary text-white px-4 py-1 rounded shadow-lg'>
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
    speedUnit,
    colorTheme,
}) => {
    const { location, current } = searchedLocation || {};

    const localTime = location?.localtime;
    const currentHour = getHour(localTime, false);
    const currentHourLabel = getCurrentHourLabel(currentHour);

    const data = forecastHour.map((hour) => {
        const hourLabel = getHourLabel(hour.time);
        return {
            name: hourLabel,
            wind: speedUnit === 'm/ph' ? hour.wind_mph : hour.wind_kph,
        };
    });

    const dotColors = colorTheme === 'light' ? '#fff' : '#000';

    return (
        <Panel extraClasses='!items-start'>
            <div>
                <header className='mb-2'>
                    <h1 className='text-sm'>Wind</h1>
                </header>
                <div className='flex items-center text-neutral-darkGrey/50 dark:text-white/50'>
                    <Icon iconName='air' extraClasses='mr-2 text-base' />
                    <span className='text-xs'>
                        Current wind speed:{' '}
                        {speedUnit === 'mp/h'
                            ? current.wind_mph
                            : current.wind_kph}
                        {speedUnit}
                    </span>
                </div>
            </div>
            <div className='flex w-full h-64 lg:h-32'>
                <ResponsiveContainer>
                    <ComposedChart
                        width={300}
                        height={150}
                        data={data}
                        margin={{
                            top: 20,
                            right: 10,
                            bottom: 10,
                            left: 0,
                        }}
                        className='u-recharts-fix-overflow u-recharts-fix-overflow-tick'
                    >
                        <defs>
                            <linearGradient
                                id='colorUv'
                                x1='0'
                                y1='0'
                                x2='0'
                                y2='1'
                            >
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
                                value: `${speedUnit} over the day`,
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
                        <Tooltip content={<CustomTooltip unit={speedUnit} />} />
                        <Area
                            type='natural'
                            dataKey='wind'
                            fill='url(#colorUv)'
                            stroke='none'
                            dot={{ fill: dotColors }}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </Panel>
    );
};

export default WindPanel;
