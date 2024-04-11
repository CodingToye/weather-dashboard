// src/features/DashboardPanels/TemperaturePanel.tsx

/**
 * Temperature Component
 * Display Temperature data in the form of a chart
 *
 * @component
 * @example
 * return (
 *  <TemperaturePanel
      unit={tempUnit}
      forecastHour={forecastHour}
    />
 * )
 */

import {
  ComposedChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

import {ForecastHour} from "../../types/types";
import CustomTooltip from "../../components/CustomTooltip";
import {getHourLabel, getCurrentHourLabel} from "../../utils/dates.utils";
import {useTheme} from "../../context/themeContext";

/** Properties for the TemperaturePanel component
 *
 * Defines the props accepted by the TemperaturePanel component to return useful data.
 *
 * @interface
 */

export interface TemperaturePanelProps {
  /** current active unit */
  unit: string;
  /** ForecastHour object */
  forecastHour: ForecastHour[];
}

const TemperaturePanel: React.FC<TemperaturePanelProps> = ({
  unit,
  forecastHour,
}) => {
  const {theme} = useTheme();
  const currentHour = new Date().getHours(); // Get the current hour

  const currentHourLabel = getCurrentHourLabel(currentHour);

  const data = forecastHour.map((hour) => {
    if (hour && hour.time) {
      const hourLabel = getHourLabel(hour.time);
      return {
        name: hourLabel,
        temp: unit === "C" ? hour.temp_c : hour.temp_f,
      };
    } else {
      return null;
    }
  });

  const dotColors = theme === "light" ? "#fff" : "#000";

  return (
    <section className="text-center" data-testid="temperature-panel-test">
      <header className="mb-4 text-sm text-primary">
        <h1>Temperature</h1>
      </header>
      <div className="flex w-full h-64">
        <ResponsiveContainer>
          <ComposedChart
            width={350}
            height={250}
            data={data}
            margin={{
              top: 20,
              right: 30,
              bottom: 20,
              left: 20,
            }}
            className="u-recharts-fix-overflow u-recharts-fix-overflow-ticks"
          >
            <defs>
              <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f2651d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#f2651d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f2651d"
              strokeOpacity={0.2}
              horizontal={true}
            />
            <YAxis hide />
            <XAxis
              dataKey="name"
              height={10}
              tickLine={false}
              axisLine={false}
              tick={{
                fontSize: "10px",
                stroke: "white",
                strokeOpacity: ".2",
              }}
            />
            <ReferenceLine
              x={currentHourLabel}
              stroke="rgba(255,255,255,.5)"
              strokeDasharray="3 3"
            />
            <Tooltip content={<CustomTooltip unit={unit} />} />
            <Area
              type="natural"
              dataKey="temp"
              fill="url(#tempGradient)"
              stroke="none"
              dot={{fill: dotColors}}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default TemperaturePanel;
