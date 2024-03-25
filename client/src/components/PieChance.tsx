import { PieChart, Pie, Cell } from 'recharts';

interface CustomLabelProps {
    cx: number;
    cy: number;
    percent: number;
    name: string;
}

interface PieChanceProps {
    data: { name: string; value: number }[];
}

const PieChance: React.FC<PieChanceProps> = ({ data }) => {
    const colors = ['#f2651d', 'rgba(0,0,0,.1'];
    const keyValue = data[0].name;
    const renderCustomLabel = ({ cx, cy, percent, name }: CustomLabelProps) => {
        if (name === keyValue) {
            return (
                <text
                    x={cx}
                    y={cy}
                    fill='white'
                    textAnchor='middle'
                    dominantBaseline='central'
                >
                    {`${(percent * 100).toFixed(0)}%`}
                </text>
            );
        }
        return null;
    };

    return (
        <PieChart width={100} height={100}>
            <Pie
                data={data}
                dataKey='value'
                cx='50%'
                cy='50%'
                innerRadius={45}
                outerRadius={50}
                paddingAngle={0}
                label={renderCustomLabel}
                labelLine={false}
            >
                {data.map((entry, index) => (
                    <Cell
                        key={`cell-${index}`}
                        fill={colors[index % colors.length]}
                        stroke={colors[index % colors.length]}
                    />
                ))}
            </Pie>
        </PieChart>
    );
};

export default PieChance;
