// src/features/DashboardPanels/SnowPanel.tsx

/**
 * SnowPanel Component
 * Display Snow data in the form of a chart
 *
 * @component
 * @example
 * return (
 *  <SnowPanel
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
import {cmToMm, cmToInches} from "../../utils/units.utils";

export interface SnowPanelProps {
  forecast: Forecast;
  measurementUnit: string;
}

const SnowPanel: React.FC<SnowPanelProps> = ({forecast, measurementUnit}) => {
  const totalSnow =
    measurementUnit === "mm"
      ? cmToMm(forecast?.forecastday[0]?.day.totalsnow_cm).toFixed(2)
      : cmToInches(forecast?.forecastday[0]?.day.totalsnow_cm).toFixed(2) ?? 0;
  const chanceOfSnow = forecast?.forecastday[0]?.day.daily_chance_of_snow ?? 0;
  const data = [
    {name: "Chance of Snow", value: chanceOfSnow},
    {name: "Remaining", value: 100 - chanceOfSnow},
  ];

  return (
    <Panel flexDirection="col" itemsCentered dataTestId="snow-panel-test">
      <div className="flex flex-col items-center">
        <header className="mb-2">
          <h1 className="text-sm">Snow chance</h1>
        </header>
        <div className="flex items-center text-neutral-darkGrey/50 dark:text-white/50">
          <Icon
            iconName="weather_snowy"
            extraClasses="mr-2 text-base"
            ariaLabel="Snow icon"
          />
          <span className="text-xs">
            {totalSnow} {measurementUnit}
          </span>
        </div>
      </div>

      <PieChance data={data} />
    </Panel>
  );
};

export default SnowPanel;
