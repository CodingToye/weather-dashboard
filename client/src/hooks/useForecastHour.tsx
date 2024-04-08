// src/hooks/useForecastHour.tsx

/**
 * `useForecastHour` Hook
 *
 * This custom hook is designed to extract and return an array of specific hourly forecasts
 * from a `Forecast` object. It selects forecasts for the times of 6 AM, 12 PM, 6 PM, and 12 AM
 * from the first day of the provided forecast data. If the forecast data is not available, it returns an empty array.
 *
 * @param {Forecast | undefined} forecast - An optional `Forecast` object that contains the forecast data,
 * including an array of hourly forecasts for several days.
 *
 * @returns {ForecastHour[]} An array of `ForecastHour` objects for the specified hours. If the forecast data
 * is unavailable, or the specified hours are not found in the data, it returns an empty array.
 *
 * @example
 * // Assuming you have a `Forecast` object named `forecastData`:
 * const hourlyForecast = useForecastHour(forecastData);
 *
 * hourlyForecast.forEach(hour => {
 *   console.log(`Temperature at ${hour.time} is ${hour.temp_c} degrees Celsius.`);
 * });
 *
 * Note: This hook relies on the structure of the `Forecast` object, specifically expecting the
 * `forecastday[0].hour` array to be populated with hourly forecast data. Ensure that your `Forecast`
 * object adheres to this structure.
 */

import {useMemo} from "react";
import {Forecast, ForecastHour} from "../types/types";

export const useForecastHour = (forecast?: Forecast): ForecastHour[] => {
  return useMemo(() => {
    if (!forecast || !forecast.forecastday[0]?.hour) {
      return [];
    }

    return [
      forecast?.forecastday[0]?.hour[6],
      forecast?.forecastday[0]?.hour[12],
      forecast?.forecastday[0]?.hour[18],
      forecast?.forecastday[0]?.hour[0],
    ].filter(Boolean) as ForecastHour[];
  }, [forecast]);
};
