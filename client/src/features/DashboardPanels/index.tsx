// src/features/DashboardPanels/index.tsx

/**
 * DashboardPanelsContainer Component
 * container for various dashboard panels
 *
 * @component
 * @example
 * return (
 *    <DashboardPanelsContainer
        searchedLocation={weatherData || null}
        fetchWeather={fetchWeather}
        tempUnit={tempUnit}
        speedUnit={speedUnit}
        measurementUnit={measurementUnit}
      />
 * )
 */

import React from "react";
import {Forecast, Alerts, CurrentWeather} from "../../types/types";
import HeroPanel from "./HeroPanel";
import ForecastsContainer from "./ForecastsContainer";
import WindPanel from "./WindPanel";
import RainPanel from "./RainPanel";
import SnowPanel from "./SnowPanel";
import UVPanel from "./UVPanel";
import CloudPanel from "./CloudPanel";
import HumidityPanel from "./HumidityPanel";
import {useForecastHour} from "../../hooks/useForecastHour";
import Loader from "../../components/Loader";

export interface DashboardPanelsProps {
  /** searchedLocation data object */
  searchedLocation: CurrentWeather | null;
  /** forecast data object */
  forecast?: Forecast | undefined;
  /** alerts data object */
  alerts?: Alerts | undefined;
  /** TODO */
  fetchWeather: (city: string) => Promise<void>;
  /** current active temp unit */
  tempUnit: string;
  /** current active speed unit */
  speedUnit: string;
  /** current active measurement unit */
  measurementUnit: string;
}

const DashboardPanelsContainer: React.FC<DashboardPanelsProps> = ({
  searchedLocation,
  tempUnit,
  speedUnit,
  measurementUnit,
}) => {
  const {current, forecast, alerts} = searchedLocation || {};
  const forecastHour = useForecastHour(forecast);
  const {humidity} = current || {};

  if (!forecast) {
    return <Loader loaderColor="#f2651d" message="Loading weather data..." />;
  }

  return (
    <>
      <div
        className="grid lg:grid-cols-2 gap-8 w-full"
        data-testid="dashboard-panels-test"
      >
        <div className="flex flex-col grow gap-8 order-1">
          {searchedLocation && (
            <HeroPanel
              searchedLocation={searchedLocation}
              tempUnit={tempUnit}
              forecastHour={forecastHour}
            />
          )}
          <div className="grid lg:grid-cols-4 gap-8">
            {searchedLocation && forecast && (
              <>
                <CloudPanel current={searchedLocation.current} />
                {humidity && <HumidityPanel humidity={humidity} />}

                <RainPanel
                  forecast={forecast}
                  measurementUnit={measurementUnit}
                />
                <SnowPanel
                  forecast={forecast}
                  measurementUnit={measurementUnit}
                />
              </>
            )}
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {searchedLocation && (
              <>
                <WindPanel
                  searchedLocation={searchedLocation}
                  forecastHour={forecastHour}
                  speedUnit={speedUnit}
                />
                <UVPanel
                  current={searchedLocation.current}
                  forecast={forecast}
                />
              </>
            )}
          </div>
        </div>
        <div className="overflow-hidden order-2">
          {searchedLocation && (
            <ForecastsContainer
              forecast={forecast}
              unit={tempUnit}
              searchedLocation={searchedLocation}
              alerts={alerts}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardPanelsContainer;
