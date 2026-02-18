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

import {SearchedLocation, Current} from "../../types/types";
import {useForecastHour} from "../../hooks/useForecastHour";
import Loader from "../../components/Loader";
import {useUnits} from "../../context/unitsContext";
import Icon from "../../components/Icon";

import {Forecast} from "./ForecastPanels/types";
import HeroPanel from "./HeroPanel";
import ForecastsPanel from "./ForecastPanels";
import WindPanel from "./WindPanel";
import RainPanel from "./RainPanel";
import SnowPanel from "./SnowPanel";
import UVPanel from "./UVPanel";
import CloudPanel from "./CloudPanel";
import AirQualityPanel from "./AirQualityPanels";
import HumidityPanel from "./HumidityPanel";
import AstroPanel from "./AstroPanels";

export interface DashboardPanelsProps {
  /** searchedLocation data object */
  searchedLocation: SearchedLocation | null;
  /** forecast data object */
  forecast?: Forecast | undefined;
  /** current weather data object */
  current?: Current | null;
  /** alerts data object */
}

const DashboardPanelsContainer: React.FC<DashboardPanelsProps> = ({
  searchedLocation,
}) => {
  const {tempUnit, speedUnit, measurementUnit} = useUnits();
  const {current, forecast, error} = searchedLocation || {};
  const forecastHour = useForecastHour(forecast);
  const {humidity} = current || {};

  if (!searchedLocation || error?.code === 1006) {
    return (
      <div className="px-8 flex items-center justify-center">
        <div className="flex items-center gap-2 bg-failure p-2 rounded">
          <Icon iconName="warning" />
          <p className="text-sm">{error?.message} Please search again.</p>
        </div>
      </div>
    );
  }
  if (!forecast || !current) {
    return <Loader loaderColor="#f2651d" message="Loading weather data..." />;
  }

  return (
    <>
      <div
        className="grid lg:grid-cols-2 gap-8 grow w-full px-8 pb-8"
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
            {searchedLocation && forecast && current && (
              <>
                <CloudPanel current={current} />
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
            {searchedLocation && current && (
              <>
                <WindPanel
                  current={current}
                  forecastHour={forecastHour}
                  speedUnit={speedUnit}
                />
                <UVPanel current={current} forecast={forecast} />
              </>
            )}
          </div>
          <div className="hidden lg:block">
            {current && current.air_quality && (
              <AirQualityPanel current={{air_quality: current.air_quality}} />
            )}
          </div>
        </div>
        <div className="overflow-hidden order-2">
          <div className="overflow-hidden flex-col flex grow gap-8">
            {searchedLocation && (
              <>
                <ForecastsPanel
                  forecast={forecast}
                  unit={tempUnit}
                  searchedLocation={searchedLocation}
                />
                <AstroPanel searchedLocation={searchedLocation} />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPanelsContainer;
