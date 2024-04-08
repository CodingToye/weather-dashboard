// src/features/DashboardPanels/HumidityPanel.tsx

/**
 * Humidity Component
 * Display Humidity levels in the form of a chart
 *
 * @component
 * @example
 * return (
 *  {humidity && (
      <HumidityPanel humidity={humidity} />
    )}
 * )
 */

import Panel from "../../components/Panel";
import PieChance from "../../components/PieChance";
import Icon from "../../components/Icon";
import {humidityLevels} from "../../utils/weather.utils";

/** Properties for the HumidityPanel component
 *
 * Defines the props accepted by the HumidityPanel component to return useful data.
 *
 * @interface
 */
export interface HumidityPanelProps {
  // Humidity levels as a number
  humidity: number;
}

const HumidityPanel: React.FC<HumidityPanelProps> = ({humidity}) => {
  const data = [
    {name: "Humidity", value: humidity},
    {name: "Remaining", value: 100 - humidity},
  ];

  const currentHumidityLevels = humidityLevels(humidity);

  return (
    <Panel itemsCentered dataTestId="humidity-panel-test">
      <div className="flex flex-col items-center">
        <header className="mb-2">
          <h1 className="text-sm">Humidity</h1>
        </header>
        <div className="flex items-center text-neutral-darkGrey/50 dark:text-white/50">
          <Icon
            iconName={currentHumidityLevels.icon}
            extraClasses="mr-2 text-base"
            ariaLabel={` ${currentHumidityLevels.text} icon`}
          />
          <span className="text-xs">{currentHumidityLevels.text}</span>
        </div>
      </div>

      <PieChance data={data} />
    </Panel>
  );
};

export default HumidityPanel;
