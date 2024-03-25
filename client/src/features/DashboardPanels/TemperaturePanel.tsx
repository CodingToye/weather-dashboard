import { ForecastHour } from '../../types/types';
import {
    getHourLabel,
    getHour,
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

interface TemperaturePanelProps {
    unit: string;
    forecastHour: ForecastHour[];
}

const CustomTooltip = ({ payload, label, unit }: any) => {
    return (
        <div className='bg-color6 px-4 py-1 rounded shadow-lg'>
            <p className='text-xs'>
                {`${label}: ${payload[0]?.value}`}
                <sup>&deg;</sup>
                {`${unit}`}
            </p>
        </div>
    );
};

const TemperaturePanel: React.FC<TemperaturePanelProps> = ({
    unit,
    forecastHour,
}) => {
    const currentHour = new Date().toString(); // Get the current hour
    const formattedCurrentHour = getHour(currentHour, false);

    const currentHourLabel = getCurrentHourLabel(formattedCurrentHour);

    const data = forecastHour.map((hour) => {
        if (hour && hour.time) {
            const hourLabel = getHourLabel(hour.time);
            return {
                name: hourLabel,
                temp: unit === 'C' ? hour.temp_c : hour.temp_f,
            };
        } else {
            return null;
        }
    });

    return (
        <section>
            <h1>Temperature</h1>
            <ComposedChart
                width={350}
                height={150}
                data={data}
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                }}
                className='u-recharts-fix-overflow u-recharts-fix-overflow-ticks'
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
                    tick={{
                        fontSize: '10px',
                        stroke: 'white',
                        strokeOpacity: '.2',
                    }}
                />
                <ReferenceLine
                    x={currentHourLabel}
                    stroke='rgba(255,255,255,.5)'
                    strokeDasharray='3 3'
                />
                <Tooltip content={<CustomTooltip unit={unit} />} />
                <Area
                    type='natural'
                    dataKey='temp'
                    fill='url(#colorUv)'
                    stroke='none'
                    dot={{ fill: 'white' }}
                />
            </ComposedChart>
        </section>
    );
};

export default TemperaturePanel;
