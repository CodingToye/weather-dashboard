// src/features/DashboardPanels/RainPanel.tsx

/**
 * RainPanel Component
 * Display Rain data in the form of a chart
 *
 * @component
 * @example
 * return (
 *  <RainPanel
      forecast={forecast}
      searchedLocation={searchedLocation}
      measurementUnit={measurementUnit}
    />
 * )
 */

import Panel from "../../components/Panel";
import PieChance from "../../components/PieChance";
import Icon from "../../components/Icon";
import {Forecast} from "../../types/types";

export interface RainPanelProps {
  forecast: Forecast;
  measurementUnit: string;
}

const RainPanel: React.FC<RainPanelProps> = ({forecast, measurementUnit}) => {
  const totalPrecipitation =
    measurementUnit === "mm"
      ? forecast?.forecastday[0]?.day.totalprecip_mm
      : forecast?.forecastday[0]?.day.totalprecip_in ?? 0;
  const chanceOfRain = forecast?.forecastday[0]?.day.daily_chance_of_rain ?? 0;
  const data = [
    {name: "Chance of Rain", value: chanceOfRain},
    {name: "Remaining", value: 100 - chanceOfRain},
  ];

  return (
    <Panel itemsCentered dataTestId="rain-panel-test">
      <div className="flex flex-col items-center">
        <header className="mb-2">
          <h1 className="text-sm text-primary">Rain chance</h1>
        </header>
        <div className="flex items-center text-neutral-darkGrey/50 dark:text-white/50">
          <Icon
            iconName="rainy"
            extraClasses="mr-2 text-base"
            ariaLabel="Rain icon"
          />
          <span className="text-xs">
            {totalPrecipitation} {measurementUnit}
          </span>
        </div>
      </div>

      <PieChance data={data} />
    </Panel>
  );
};

export default RainPanel;
