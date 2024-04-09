import UnitSwitcher from "../../components/UnitSwitcher";
import {useUnits} from "../../context/unitsContext";

const UnitSwitchers = () => {
  const {
    tempUnit,
    speedUnit,
    measurementUnit,
    handleTempUnitChange,
    handleSpeedUnitChange,
    handleMeasurementUnitChange,
  } = useUnits();

  if (
    !tempUnit ||
    !speedUnit ||
    !measurementUnit ||
    !handleTempUnitChange ||
    !handleSpeedUnitChange ||
    !handleMeasurementUnitChange
  ) {
    throw new Error("useUnits must be used within a UnitsProvider");
  }

  return (
    <>
      <UnitSwitcher
        unit={tempUnit}
        onUnitChange={handleTempUnitChange}
        unitType="temperature"
      />
      <UnitSwitcher
        unit={speedUnit}
        onUnitChange={handleSpeedUnitChange}
        unitType="speed"
      />
      <UnitSwitcher
        unit={measurementUnit}
        onUnitChange={handleMeasurementUnitChange}
        unitType="measurements"
      />
    </>
  );
};

export default UnitSwitchers;
