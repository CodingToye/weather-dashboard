import React, {createContext, useState, useContext, ReactNode} from "react";

interface UnitsContextType {
  tempUnit: string;
  speedUnit: string;
  measurementUnit: string;
  handleTempUnitChange: React.Dispatch<string>;
  handleSpeedUnitChange: React.Dispatch<string>;
  handleMeasurementUnitChange: React.Dispatch<string>;
}

const UnitsContext = createContext<UnitsContextType | undefined>(undefined);

export const useUnits = () =>
  useContext(UnitsContext) ?? {
    tempUnit: "C",
    speedUnit: "mph",
    measurementUnit: "mm",
    handleTempUnitChange: () => {
      throw new Error(
        "handleTempUnitChange was called without a UnitsProvider"
      );
    },
    handleSpeedUnitChange: () => {
      throw new Error(
        "handleSpeedUnitChange was called without a UnitsProvider"
      );
    },
    handleMeasurementUnitChange: () => {
      throw new Error(
        "handleMeasurementUnitChange was called without a UnitsProvider"
      );
    },
  };

export function UnitsProvider({children}: {children: ReactNode}) {
  const [tempUnit, setTempUnit] = useState("C");
  const [speedUnit, setSpeedUnit] = useState("mph");
  const [measurementUnit, setMeasurementUnit] = useState("mm");

  const handleTempUnitChange = (newUnit: string) => {
    setTempUnit(newUnit);
  };

  const handleSpeedUnitChange = (newUnit: string) => {
    console.log("change...");
    setSpeedUnit(newUnit);
  };

  const handleMeasurementUnitChange = (newUnit: string) => {
    setMeasurementUnit(newUnit);
  };

  return (
    <UnitsContext.Provider
      value={{
        tempUnit,
        speedUnit,
        measurementUnit,
        handleTempUnitChange,
        handleSpeedUnitChange,
        handleMeasurementUnitChange,
      }}
    >
      {children}
    </UnitsContext.Provider>
  );
}
