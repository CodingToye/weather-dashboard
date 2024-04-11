// src/features/DashboardPanels/UVPanel.tsx

/**
 * UVPanel Component
 * Display UV data in the form of a chart
 *
 * @component
 * @example
 * return (
 *  <UVPanel
      forecast={forecast}
      current={searchedLocation.current}
    />
 * )
 */

import {
  ComposedChart,
  CartesianGrid,
  Area,
  YAxis,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import Panel from "../../components/Panel";
import CustomTooltip from "../../components/CustomTooltip";
import {Forecast} from "../../types/types";
import {UVIndexBadges} from "../../components/UVIndexBadges";
import Icon from "../../components/Icon";
import {getDay} from "../../utils/dates.utils";
import {useTheme} from "../../context/themeContext";

/** Properties for the UVPanel component
 *
 * Defines the props accepted by the UVPanel component to return useful data.
 *
 * @interface
 */

export interface UVPanelProps {
  /** searchedLocation data object */
  current: {
    uv: number;
  };
  /** returns forecast object to access data */
  forecast: Forecast;
}

const UVPanel: React.FC<UVPanelProps> = ({current, forecast}) => {
  const {theme} = useTheme();
  const uvIndex = current?.uv ?? 0;
  const uvWeeklyForecast = forecast.forecastday.slice(1);

  const data = uvWeeklyForecast.map((uv) => {
    return {
      name: getDay(uv.date, false),
      uv: uv.day.uv,
    };
  });

  const dotColors = theme === "light" ? "#fff" : "#000";

  return (
    <Panel extraClasses="!items-start" dataTestId="uv-panel-test">
      <div>
        <header className="mb-2">
          <h1 className="text-sm text-primary">UV index</h1>
        </header>
        <div className="flex items-center gap-4 text-neutral-darkGrey/50 dark:text-white/50">
          <div className="flex items-center">
            <Icon
              iconName="sunny"
              extraClasses="mr-2 text-base"
              ariaLabel="Sun icon"
            />
            <span className="text-xs">{uvIndex}</span>
          </div>
          <div className="flex gap-1">
            <UVIndexBadges uvIndex={uvIndex} />
          </div>
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
              <linearGradient id="uvGradient" x1="0" y1="0" x2="0" y2="1">
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
                value: "UV index over the week",
                fontSize: "10px",
                position: "insideBottom",
                offset: -10,
              }}
            />
            <Tooltip content={<CustomTooltip category="UV Index" />} />
            <Area
              type="natural"
              dataKey="uv"
              fill="url(#uvGradient)"
              stroke="none"
              dot={{fill: dotColors}}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  );
};

export default UVPanel;
