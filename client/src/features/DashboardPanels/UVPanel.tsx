import Panel from '../../containers/Panel';

import { CurrentWeather, Forecast } from '../../types/types';
import Badge from '../../components/Badge';
import Icon from '../../components/Icon';
import { getDay } from '../../utils/dates.utils';
import {
    ComposedChart,
    CartesianGrid,
    Area,
    YAxis,
    XAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

interface UVProps {
    searchedLocation: CurrentWeather;
    forecast: Forecast;
    colorTheme: string;
}

const getUVRating = (uvIndex: number, min: number, max: number): boolean => {
    return uvIndex >= min && uvIndex <= max;
};

const CustomTooltip = ({ payload, label }: any) => {
    return (
        <div className='bg-primary text-white px-4 py-1 rounded shadow-lg'>
            <p className='text-xs'>{`${label}: ${payload[0]?.value}`}</p>
        </div>
    );
};

const UVPanel: React.FC<UVProps> = ({
    forecast,
    searchedLocation,
    colorTheme,
}) => {
    const { current } = searchedLocation || {};
    const uvIndex = current?.uv ?? 0;
    const uvWeeklyForecast = forecast.forecastday.slice(1);

    const data = uvWeeklyForecast.map((uv) => {
        return {
            name: getDay(uv.date, false),
            uv: uv.day.uv,
        };
    });

    const dotColors = colorTheme === 'light' ? '#fff' : '#000';

    return (
        <Panel extraClasses='!items-start'>
            <div>
                <header className='mb-2'>
                    <h1 className='text-sm'>UV index</h1>
                </header>
                <div className='flex items-center gap-4 text-neutral-darkGrey/50 dark:text-white/50'>
                    <div className='flex items-center'>
                        <Icon iconName='sunny' extraClasses='mr-2 text-base' />
                        <span className='text-xs'>{uvIndex}</span>
                    </div>
                    <div className='flex gap-1'>
                        <Badge
                            bgColor='uv-low'
                            textColor='uv-lowDark'
                            active={getUVRating(uvIndex, 0, 2)}
                        >
                            low
                        </Badge>
                        <Badge
                            bgColor='uv-moderate'
                            textColor='uv-moderateDark'
                            active={getUVRating(uvIndex, 3, 5)}
                        >
                            moderate
                        </Badge>
                        <Badge
                            bgColor='uv-high'
                            textColor='uv-highDark'
                            active={getUVRating(uvIndex, 6, 7)}
                        >
                            high
                        </Badge>
                        <Badge
                            bgColor='uv-veryHigh'
                            textColor='uv-veryHighDark'
                            active={getUVRating(uvIndex, 8, 10)}
                        >
                            very high
                        </Badge>
                        <Badge
                            bgColor='uv-extreme'
                            textColor='uv-extremeDark'
                            active={getUVRating(uvIndex, 11, 99)}
                        >
                            extreme
                        </Badge>
                    </div>
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
                                value: 'UV index over the week',
                                fontSize: '10px',
                                position: 'insideBottom',
                                offset: -10,
                            }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                            type='natural'
                            dataKey='uv'
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

export default UVPanel;
