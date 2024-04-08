// src/features/DashboardPanels/ForecastsContainer.tsx

/**
 * ForecastsContainer Component
 * container for various forecast panels, such as Hourly, Weekly and Alerts
 *
 * @component
 * @example
 * return (
 *  {searchedLocation && (
      <ForecastsContainer
        forecast={forecast}
        unit={tempUnit}
        searchedLocation={searchedLocation}
        alerts={alerts}
      />
    )}
 * )
 */

import WeeklyForecastPanel from "./WeeklyForecastPanel";
import HourlyForecastPanel from "./HourlyForecastPanel";
import AlertsPanel from "./AlertsPanel";
import {Forecast, CurrentWeather, Alerts} from "../../types/types";

/** Properties for the ForecastsContainer component
 *
 * Defines the props accepted by the ForecastsContainer component to return useful data.
 *
 * @interface
 */
export interface ForecastsContainerProps {
  /** searchedLocation data object */
  searchedLocation: {
    location: {
      name: string;
      region: string;
      country: string;
      localtime: string;
    };
  };
  /** forecast data object */
  forecast: Forecast | undefined;
  /** alerts data object */
  alerts: Alerts | undefined;
  /** current active unit */
  unit: string;
}

const ForecastsContainer: React.FC<ForecastsContainerProps> = ({
  forecast,
  unit,
  alerts,
  searchedLocation,
}) => {
  const hasAlerts = !!alerts?.alert?.length;

  return (
    <>
      <div className="flex h-full flex-col gap-8  overflow-hidden">
        {forecast && (
          <>
            {hasAlerts && <AlertsPanel weatherAlerts={alerts} />}
            {searchedLocation && (
              <HourlyForecastPanel
                forecast={forecast}
                unit={unit}
                location={searchedLocation?.location}
              />
            )}

            <WeeklyForecastPanel forecast={forecast} unit={unit} />
          </>
        )}
      </div>
    </>
  );
};

export default ForecastsContainer;
