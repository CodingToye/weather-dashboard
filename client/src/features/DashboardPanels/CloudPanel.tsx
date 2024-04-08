// src/features/DashboardPanels/CloudPanel.tsx

/**
 * CloudPanel Component
 * Display Cloud cover data in the form of a chart
 *
 * @component
 * @example
 * return (
 *  <CloudPanel
      current={searchedLocation.current}
     />
 * )
 */

import Panel from "../../components/Panel";
import PieChance from "../../components/PieChance";
import Icon from "../../components/Icon";
import {cloudLevels} from "../../utils/weather.utils";

/** Properties for the CloudPanel component
 *
 * Defines the props accepted by the CloudPanel component to return useful data.
 *
 * @interface
 */

export interface CloudPanelProps {
  /** Contains only the location part of the CurrentWeather type */
  current: {
    cloud: number;
  };
  /** The current color theme. Expected values are 'light' or 'dark', determined by an external theme management hook. */
  // colorTheme: string;
}

const CloudPanel: React.FC<CloudPanelProps> = ({current}) => {
  const {cloud} = current || {};
  const data = [
    {name: "Cloud coverage", value: cloud},
    {name: "Remaining", value: 100 - cloud},
  ];

  const currentCloudLevels = cloudLevels(cloud);

  return (
    <Panel itemsCentered={true} dataTestId="cloud-panel-test">
      <div className="flex flex-col items-center">
        <header className="mb-2">
          <h1 className="text-sm">Cloud cover</h1>
        </header>
        <div className="flex items-center text-neutral-darkGrey/50 dark:text-white/50">
          <Icon
            iconName={currentCloudLevels.icon}
            extraClasses="mr-2 text-base"
            ariaLabel="Clouds icon"
          />
          <span className="text-xs">{currentCloudLevels.text}</span>
        </div>
      </div>

      <PieChance data={data} />
    </Panel>
  );
};

export default CloudPanel;
