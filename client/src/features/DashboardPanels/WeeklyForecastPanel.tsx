// src/features/DashboardPanels/WeeklyForecastPanel.tsx

/**
 * WeeklyForecastPanel Component
 * Display a weekly forecast based on location and current unit
 *
 * @component
 * @example
 * return (
 *  <WeeklyForecast forecast={forecast} unit={unit} />
 * )
 */

import React from "react";
import {getDay, getShortDate} from "../../utils/dates.utils";
import Panel from "../../components/Panel";
import {Forecast, ForecastDay} from "../../types/types";

/** Properties for the WeeklyForecastPanel component
 *
 * Defines the props accepted by the WeeklyForecastPanel component to return useful data.
 *
 * @interface
 */
export interface WeeklyForecastPanelProps {
  /** forecast data object */
  forecast: Forecast;
  /** current active unit */
  unit: string;
}

const WeeklyForecastPanel: React.FC<WeeklyForecastPanelProps> = ({
  forecast,
  unit,
}) => {
  const weeklyForecast = forecast.forecastday.slice(1);
  return (
    <>
      <Panel dataTestId="weekly-forecast-panel-test">
        <header className="mb-0">
          <h1 className="text-sm">Weekly Forecast</h1>
        </header>
        <div className="flex flex-col items-start gap-2">
          {weeklyForecast.map((day: ForecastDay, index: number) => (
            <div
              key={day.date}
              className=" text-neutral-darkGrey dark:text-white rounded flex flex-row gap-4 w-full items-center justify-between py-2"
            >
              <div className="grow">
                <h3 className="text-sm">
                  {index === 0 ? "Tomorrow" : getDay(day.date, false)}
                </h3>
                <span className="text-xs text-neutral-darkGrey/50 dark:text-white/50">
                  {getShortDate(day.date)}
                </span>
              </div>
              <span className="debug text-lg text-neutral-darkGrey/75 dark:text-white/75">
                {Math.round(
                  unit === "C" ? day.day.avgtemp_c : day.day.avgtemp_f
                )}
                &deg;{unit}
              </span>
              <img
                src={day.day.condition.icon}
                alt={`${day.day.condition.text} icon`}
                className="w-16"
              />
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
};

export default WeeklyForecastPanel;
