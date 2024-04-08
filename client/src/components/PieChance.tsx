// src/components/PieChance.tsx

/**
 * PieChance Component
 * This component renders Recharts PieChart from https://recharts.org/en-US/api/PieChart
 * @component
 * @example
 * return (
 *  <PieChance data={data} />
 * )
 */

import {PieChart, Pie, Cell} from "recharts";
import {useTheme} from "../context/themeContext";

/** Properties for the PieChance component
 *
 * Defines the props accepted by the PieChance component.
 *
 * @interface
 */

export interface CustomLabelProps {
  /**
   * The x-coordinate of the label's center within the chart.
   * If a percentage is provided, it's calculated relative to the chart's width.
   */
  cx: number;
  /**
   * The y-coordinate of the label's center within the chart.
   * If a percentage is provided, it's calculated relative to the chart's height.
   */
  cy: number;
  /**
   * The sector's percentage of the total chart, expressed as a decimal.
   * Used to calculate the displayed percentage value for the label.
   */
  percent: number;
  /**
   * The name of the data entry.
   * Used to determine if the label should be rendered based on specific logic.
   */
  name: string;
}

export interface PieChanceProps {
  /**
   * The data to be rendered by the pie chart. Each entry should include a name and a value.
   */
  data: {name: string; value: number}[];
}

const PieChance: React.FC<PieChanceProps> = ({data}) => {
  const {theme} = useTheme();
  const colors = [
    {start: "#f2651d", end: "#000"},
    {start: "#000000", end: "#000000"},
  ];

  // TODO - consider abstracting to a util
  const textColors = theme === "dark" ? "#000" : "#fff";

  const keyValue = data[0].name;
  const renderCustomLabel = ({cx, cy, percent, name}: CustomLabelProps) => {
    if (name === keyValue) {
      return (
        <text
          x={cx}
          y={cy}
          fill={textColors}
          textAnchor="middle"
          dominantBaseline="central"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    }
    return null;
  };

  return (
    <div className="relative z-20">
      <PieChart width={100} height={100}>
        <defs>
          {data.map((_, index) => (
            <linearGradient id={`myGradient${index}`} key={index}>
              <stop
                offset="0%"
                stopColor={colors[index % colors.length].start}
              />
              <stop
                offset="100%"
                stopColor={colors[index % colors.length].end}
              />
            </linearGradient>
          ))}
        </defs>

        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={45}
          outerRadius={50}
          paddingAngle={0}
          label={renderCustomLabel}
          labelLine={false}
        >
          {data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={`url(#myGradient${index})`}
              stroke={`url(#myGradient${index})`}
            />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default PieChance;

// TODO - Write a unit test
