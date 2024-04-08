// src/features/DashboardPanels/WindPanel.tsx

/**
 * WindPanel Component
 * Display Wind data in the form of a chart
 *
 * @component
 * @example
 * return (
 *  <WindPanel
      searchedLocation={searchedLocation}
      forecastHour={forecastHour}
      speedUnit={speedUnit}
    />
 * )
 */

import Panel from "../../components/Panel";
import Icon from "../../components/Icon";
import CustomTooltip from "../../components/CustomTooltip";
import {ForecastHour, CurrentWeather} from "../../types/types";
import {getHourLabel, getCurrentHourLabel} from "../../utils/dates.utils";
import {useTheme} from "../../context/themeContext";

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

/** Properties for the WindPanel component
 *
 * Defines the props accepted by the WindPanel component to return useful data.
 *
 * @interface
 */

export interface WindPanelProps {
  /** returns forecastHour object to access wind_mph or wind_kph */
  forecastHour: ForecastHour[];
  /** searchedLocation data object */
  searchedLocation: CurrentWeather;
  /** current active speed unit */
  speedUnit: string;
}

const WindPanel: React.FC<WindPanelProps> = ({
  forecastHour,
  searchedLocation,
  speedUnit,
  // colorTheme,
}) => {
  const {theme} = useTheme();
  const {current} = searchedLocation || {};

  // const localTime = location?.localtime;
  const currentHour = new Date().getHours(); // Get the current hour
  const currentHourLabel = getCurrentHourLabel(currentHour);

  const data = forecastHour.map((hour) => {
    const hourLabel = getHourLabel(hour.time);
    return {
      name: hourLabel,
      wind: speedUnit === "mph" ? hour.wind_mph : hour.wind_kph,
    };
  });

  const dotColors = theme === "light" ? "#fff" : "#000";

  return (
    <Panel extraClasses="!items-start">
      <div>
        <header className="mb-2">
          <h1 className="text-sm">Wind</h1>
        </header>
        <div className="flex items-center text-neutral-darkGrey/50 dark:text-white/50">
          <Icon
            iconName="air"
            extraClasses="mr-2 text-base"
            ariaLabel="Wind icon"
          />
          <span className="text-xs">
            Current wind speed:{" "}
            {speedUnit === "mph" ? current.wind_mph : current.wind_kph}
            {speedUnit}
          </span>
        </div>
      </div>
      <div className="flex w-full h-64 lg:h-32">
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
            className="u-recharts-fix-overflow u-recharts-fix-overflow-tick"
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
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
              tick={false}
              label={{
                value: `${speedUnit} over the day`,
                fontSize: "10px",
                position: "insideBottom",
                offset: -10,
              }}
            />
            <ReferenceLine
              x={currentHourLabel}
              stroke="rgba(255,255,255,.5)"
              strokeDasharray="3 3"
            />
            <Tooltip
              content={<CustomTooltip category="Wind" unit={speedUnit} />}
            />
            <Area
              type="natural"
              dataKey="wind"
              fill="url(#colorUv)"
              stroke="none"
              dot={{fill: dotColors}}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  );
};

export default WindPanel;
