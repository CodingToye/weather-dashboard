import {useState} from "react";

import Panel from "../../../components/Panel";
import Header from "../../../components/Header";

import {AirQuality, AirQualityPanelProps, DataDisplayProps} from "./types";
import {airQualityDescriptions} from "./airQuality.dictionary";
import {
  EPAIndexDisplay,
  DEFRAIndexDisplay,
  DefaultDataDisplay,
} from "./Displays";

type DataComponentMap = {
  [key: string]: React.FC<DataDisplayProps>;
};

const dataComponentMap: DataComponentMap = {
  "us-epa-index": EPAIndexDisplay,
  "gb-defra-index": DEFRAIndexDisplay,
  default: DefaultDataDisplay,
};

const getDataComponent = (key: string, value: string | number): JSX.Element => {
  const Component = dataComponentMap[key] || dataComponentMap.default;
  return <Component value={value} />;
};

const AirQualityPanel: React.FC<AirQualityPanelProps> = ({current}) => {
  const [selectedTab, setSelectedTab] = useState("co");
  const {air_quality} = current || {};

  const onTabSelect = (key: string) => {
    console.log("tab clicked...", key);
    setSelectedTab(key);
  };

  const selectedValue = air_quality[selectedTab as keyof AirQuality] || "N/A";

  return (
    <Panel>
      <div>
        <Header heading="Air Quality" />
        <section className="flex gap-2 mb-4">
          {Object.keys(air_quality || {}).map((key) => (
            <button
              key={key}
              onClick={() => onTabSelect(key)}
              className={`${
                selectedTab === key
                  ? "text-white bg-primary "
                  : "text-neutral-lightGrey bg-neutral-darkGrey opacity-50"
              } transition rounded py-1 px-3 text-sm`}
            >
              {key
                .replace(/-/g, " ")
                .replace(/us epa/g, "US EPA")
                .replace(/gb defra/g, "GB DEFRA")}
            </button>
          ))}
        </section>
        <div>
          <header className="mb-4">
            <h2 className="text-sm">
              {airQualityDescriptions[selectedTab]?.name}
            </h2>
            <p className="text-xs text-white/50">
              {airQualityDescriptions[selectedTab]?.description}
            </p>
          </header>
          <div>{getDataComponent(selectedTab, selectedValue)}</div>
        </div>
      </div>
    </Panel>
  );
};

export default AirQualityPanel;
