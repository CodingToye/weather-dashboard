// src/features/DashboardPanels/HeroPanel.tsx

/**
 * HeroPanel Component
 * container for illustrating a clear overview of the current weather in your area
 *
 * @component
 * @example
 * return (
 *  {searchedLocation && (
      <HeroPanel
        searchedLocation={searchedLocation}
        tempUnit={tempUnit}
        forecast={forecast}
      />
      )}
 * )
 */

import {SearchedLocation} from "../../types/types";
import {ForecastHour} from "../DashboardPanels/ForecastPanels/types";
import Panel from "../../components/Panel";

import TemperaturePanel from "./TemperaturePanel";

/** Properties for the HeroPanel component
 *
 * Defines the props accepted by the HeroPanel component to return useful data.
 *
 * @interface
 */
export interface HeroPanelProps {
  searchedLocation: SearchedLocation;
  forecastHour: ForecastHour[];
  tempUnit: string;
}

const HeroPanel: React.FC<HeroPanelProps> = ({
  searchedLocation,
  tempUnit,
  forecastHour,
}) => {
  const {current, location} = searchedLocation || {};
  const {temp_c, temp_f, feelslike_c, feelslike_f} = current || {};
  const {icon, text} = current?.condition || {};
  return (
    <Panel dataTestId="hero-panel-test">
      <div className="shrink grid lg:grid-cols-2 gap-4 ">
        <section className="flex flex-col items-center lg:items-start">
          <div className="flex flex-col flex-wrap lg:flex-nowrap items-center lg:items-start mb-8 lg:mg-0 gap-4">
            <div className="w-full text-center lg:text-left">
              <h1 className="text-2xl">{location.name}</h1>
              <small className="text-neutral-darkGrey/50 dark:text-white/50">
                {`${location.region ? `${location.region}, ` : ""}${
                  location.country
                }`}
              </small>
            </div>
            <div className="flex flex-col items-center mb-4">
              <img src={icon} alt={` ${text} icon`} className="w-20" />
              <span className="text-xs text-neutral-darkGrey/50 dark:text-white/50">
                {text}
              </span>
            </div>
            <span className="text-4xl mb-4 grow">
              {tempUnit === "C" ? temp_c : temp_f}&deg;{tempUnit}
              <span className="text-xs lg:ml-4 text-neutral-darkGrey/50 dark:text-white/50 block lg:inline">
                Feels like {tempUnit === "C" ? feelslike_c : feelslike_f}
                &deg;
                {tempUnit}
              </span>
            </span>
          </div>
        </section>
        <section className="">
          <TemperaturePanel unit={tempUnit} forecastHour={forecastHour} />
        </section>
      </div>
    </Panel>
  );
};

export default HeroPanel;
