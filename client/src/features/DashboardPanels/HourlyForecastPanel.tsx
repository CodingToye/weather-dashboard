// src/features/DashboardPanels/HourlyForecastPanel.tsx

/**
 * HourlyForecastPanel Component
 * Display an hourly forecast based on location and current unit
 *
 * @component
 * @example
 * return (
 *  {searchedLocation && (
      <HourlyForecastPanel
        forecast={forecast}
        unit={unit}
        location={searchedLocation?.location}
      />
    )}
 * )
 */

import React from "react";

import {Forecast, ForecastHour, Location} from "../../types/types";
import {getHour} from "../../utils/dates.utils";
import Panel from "../../components/Panel";
import Icon from "../../components/Icon";

/** Properties for the HourlyForecastPanel component
 *
 * Defines the props accepted by the HourlyForecastPanel component to return useful data.
 *
 * @interface
 */
export interface HourlyForecastPanelProps {
  /** forecast data object */
  forecast: Forecast;
  /** current active unit */
  unit: string;
  /** current active location */
  location: Location;
}

const HourlyForecastPanel: React.FC<HourlyForecastPanelProps> = ({
  forecast,
  unit,
  location,
}) => {
  if (forecast.forecastday.length === 0) {
    return null;
  }

  // Get the local time from the location
  const localTime = location?.localtime;

  // Find the index of the current hour in the forecast data
  let currentIndex = -1;
  if (localTime) {
    const currentHour = getHour(localTime, false);
    currentIndex = forecast.forecastday[0].hour.findIndex(
      (hour: ForecastHour) => getHour(hour.time, false) === currentHour
    );
  }

  // Reorder the forecast data starting from the current hour
  const reorderedHourlyForecast = [
    ...forecast.forecastday[0].hour.slice(currentIndex),
    ...forecast.forecastday[0].hour.slice(0, currentIndex),
  ];

  return (
    <>
      <Panel
        extraClasses="overflow-hidden"
        dataTestId="hourly-forecast-panel-test"
      >
        <header className="mb-0">
          <h1 className="text-sm text-primary">Forecast</h1>
        </header>

        {reorderedHourlyForecast.length ? (
          <div className="flex gap-2 py-4 overflow-x-auto no-scrollbar">
            {reorderedHourlyForecast.map((hour: ForecastHour, j: number) => (
              <div
                key={`${hour.time}-${j}`}
                className={`flex flex-col justify-between gap-4 items-center shrink-0 w-24 text-white ${
                  j === 0
                    ? " bg-primary"
                    : "bg-neutral-darkGrey dark:bg-neutral-darkGrey/30 border"
                } rounded-lg p-4 border-white/20  border-dashed`}
              >
                <span
                  className={`text-sm ${
                    getHour(localTime, false) !== getHour(hour.time, false) &&
                    "lowercase"
                  } ${
                    j === 0
                      ? "text-white dark:text-white"
                      : "text-white dark:text-white"
                  }`}
                >
                  {getHour(localTime, false) === getHour(hour.time, false)
                    ? "Now"
                    : getHour(hour.time, false)}
                </span>
                <img
                  src={hour?.condition.icon}
                  alt={`${hour?.condition.text} icon`}
                  className="w-16"
                />
                <span className="text-xs">
                  {Math.round(unit === "C" ? hour.temp_c : hour.temp_f)}
                  &deg;{unit}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-failure p-4 w-auto rounded">
            <small className="text-sm flex justify-center items-center gap-2">
              <Icon iconName="warning" ariaLabel="Warning icon" />
              No hourly forecast available for this day
            </small>
          </div>
        )}
      </Panel>
    </>
  );
};

export default HourlyForecastPanel;
