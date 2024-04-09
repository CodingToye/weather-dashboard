// src/components/UnitSwitcher.tsx

/**
 * Badge Component
 * Displays a badge with customisable background and text colours.
 * Optionally, it can be marked as active to modify its appearance.
 *
 * @component
 * @example
 * return (
 *  <UnitSwitcher
      unit={tempUnit}
      onUnitChange={handleTempUnitChange}
      unitType="temperature"
    />
 * );
 */

import React, {useState, useEffect} from "react";

import CustomRadio from "../components/CustomRadio";

/**
 * Properties for the Badge Component
 *
 * Defines the props accepted by the Badge component to customise its appearance.
 *
 * @interface
 */

export interface UnitSwitchProps {
  /** current unit to switch */
  unit: string;
  /** function that handles the onChange */
  onUnitChange: (newUnit: string) => void;
  /** type of unit to be changed */
  unitType: string;
}

const UnitSwitcher: React.FC<UnitSwitchProps> = ({
  unit,
  onUnitChange,
  unitType,
}) => {
  const unitConfig = units(unitType);
  const [activeVal, setActiveVal] = useState(unit);

  useEffect(() => {
    setActiveVal(unit);
  }, [unit]);

  const handleChange = () => {
    const newUnit =
      unit === unitConfig?.val1 ? unitConfig?.val2 : unitConfig?.val1;
    if (newUnit) {
      onUnitChange(newUnit);
      setActiveVal(newUnit);
    }
  };

  return (
    <>
      <div className=" flex justify-between items-center text-white dark:text-white">
        <small className="mr-2 hidden lg:block dark:text-white/50 text-neutral-midGrey">
          {unitConfig?.text}
        </small>
        <div className="flex bg-neutral-midGrey rounded-lg relative ">
          <CustomRadio
            onChange={handleChange}
            name={unitType}
            value={unitConfig?.val1}
            id={unitConfig?.val1}
            classes="hidden switch-input"
          />
          <CustomRadio
            onChange={handleChange}
            name={unitType}
            value={unitConfig?.val2}
            id={unitConfig?.val2}
            classes="hidden switch-input"
          />

          <div
            className={`${
              activeVal === unitConfig?.val2
                ? "rounded-r-lg left-12"
                : "rounded-l-lg left-0"
            } absolute top-0 transform transition-all ease-in-out duration-150 bg-primary w-12 h-6 z-10 switch-selection`}
          ></div>
        </div>
      </div>
    </>
  );
};

function units(unitType: string) {
  switch (unitType) {
    case "temperature":
      return {text: "Temperature", val1: "C", val2: "F"};
    case "speed":
      return {text: "Speed", val1: "mph", val2: "kph"};
    case "measurements":
      return {text: "Measurements", val1: "mm", val2: "in"};
    default:
      return {text: "Unknown", val1: "N/A", val2: "N/A"}; // Default configuration
  }
}

export default UnitSwitcher;

// TODO - Write a unit test
