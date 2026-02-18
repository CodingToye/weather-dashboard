import React from "react";

import {Location} from "../../../types/types";
import {getHour} from "../../../utils/dates.utils";
import Panel from "../../../components/Panel";
import Icon from "../../../components/Icon";
import Header from "../../../components/Header";

import {Forecast, ForecastHour} from "./types";

/** Properties for the HourlyForecastPanel component */
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
      (hour) => getHour(hour.time, false) === currentHour
    );
  }

  // Reorder the forecast data starting from the current hour
  const reorderedHourlyForecast = [
    ...forecast.forecastday[0].hour.slice(currentIndex),
    ...forecast.forecastday[0].hour.slice(0, currentIndex),
  ];

  const tempDirection = (temp: number, prevTemp: number): JSX.Element => {
    const diff = temp - prevTemp;
    if (diff > 0) {
      return (
        <>
          <Icon iconName="north_east" extraClasses="text-xs text-success" />
          <span>{diff.toFixed(2)}</span>
        </>
      );
    } else if (temp < prevTemp) {
      return (
        <>
          <Icon iconName="south_west" extraClasses="text-xs text-failure" />
          <span>{Math.abs(diff).toFixed(2)}</span>
        </>
      );
    } else {
      return <span className="opacity-0">-</span>;
    }
  };

  return (
    <>
      <Panel
        extraClasses="overflow-hidden"
        dataTestId="hourly-forecast-panel-test"
      >
        <div>
          <Header heading="Hourly Forecast" />
          {reorderedHourlyForecast.length ? (
            <div className="flex gap-2 py-4 overflow-x-auto no-scrollbar">
              {reorderedHourlyForecast.map((hour, j) => (
                <div
                  key={`${hour.time}-${j}`}
                  className={`flex flex-col justify-between gap-4 items-center shrink-0 w-28 text-white ${
                    j === 0
                      ? " bg-primary"
                      : "bg-neutral-paleGrey dark:bg-neutral-darkGrey/30 border"
                  } rounded-lg p-4 border-white/20 border-dashed`}
                >
                  <span
                    className={`text-sm ${
                      getHour(localTime, false) !== getHour(hour.time, false) &&
                      "lowercase"
                    } ${
                      j === 0
                        ? "text-white dark:text-white"
                        : "text-neutral-darkGrey dark:text-white"
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
                  <span
                    className={`text-xs ${
                      getHour(localTime, false) === getHour(hour.time, false)
                        ? "text-white"
                        : "text-neutral-darkGrey"
                    } dark:text-white`}
                  >
                    {Math.round(unit === "C" ? hour.temp_c : hour.temp_f)}&deg;
                    {unit}
                  </span>
                  {j > 0 ? (
                    <span className="flex items-center gap-1 text-micro text-white/50">
                      {j > 0 &&
                        tempDirection(
                          reorderedHourlyForecast[j].temp_c,
                          reorderedHourlyForecast[j - 1].temp_c
                        )}
                    </span>
                  ) : (
                    <span className="text-xs opacity-0">N/A</span>
                  )}
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
        </div>
      </Panel>
    </>
  );
};

export default HourlyForecastPanel;
