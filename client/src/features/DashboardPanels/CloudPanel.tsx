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
import Header from "../../components/Header";

/** Properties for the CloudPanel component
 *
 * Defines the props accepted by the CloudPanel component to return useful data.
 *
 * @interface
 */

export interface CloudPanelProps {
  current: {
    cloud: number;
  };
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
        <Header heading="Cloud Cover" />
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
