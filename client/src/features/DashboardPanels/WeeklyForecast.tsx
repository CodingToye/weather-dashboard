import React from "react";
import {getDay, getShortDate} from "../../utils/dates.utils";
import Panel from "../../containers/Panel";
import {Forecast, ForecastDay} from "../../types/types";

interface WeeklyForecastProps {
  forecast: Forecast;
  unit: string;
}

const WeeklyForecast: React.FC<WeeklyForecastProps> = ({forecast, unit}) => {
  const weeklyForecast = forecast.forecastday.slice(1);
  return (
    <>
      <Panel>
        <header className="mb-0">
          <h1 className="text-sm">Weekly Forecast</h1>
        </header>
        <div className="flex flex-col items-start gap-2">
          {weeklyForecast.map((x: ForecastDay, i: number) => (
            <div
              key={i}
              className=" text-neutral-darkGrey dark:text-white rounded flex flex-row gap-4 w-full items-center justify-between py-2"
            >
              <div className="grow">
                <h3 className="text-sm">
                  {i === 0 ? "Tomorrow" : getDay(x.date, false)}
                </h3>
                <span className="text-xs text-neutral-darkGrey/50 dark:text-white/50">
                  {getShortDate(x.date)}
                </span>
              </div>
              <span className="debug text-lg text-neutral-darkGrey/75 dark:text-white/75">
                {Math.round(unit === "C" ? x.day.avgtemp_c : x.day.avgtemp_f)}
                &deg;{unit}
              </span>
              <img src={x.day.condition.icon} alt="icon" className="w-16" />
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
};

export default WeeklyForecast;
