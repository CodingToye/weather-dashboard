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
import {Forecast} from "./types";
import WeeklyForecastPanel from "./WeeklyForecastPanel";
import HourlyForecastPanel from "./HourlyForecastPanel";

/** Properties for the ForecastsContainer component
 *
 * Defines the props accepted by the ForecastsContainer component to return useful data.
 *
 * @interface
 */
export interface ForecastsPanelsProps {
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
  /** current active unit */
  unit: string;
}

const ForecastsPanels: React.FC<ForecastsPanelsProps> = ({
  forecast,
  unit,
  searchedLocation,
}) => {
  return (
    <>
      <div className="flex h-full flex-col grow gap-8  overflow-hidden">
        {forecast && (
          <>
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

export default ForecastsPanels;
