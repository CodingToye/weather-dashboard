import React, { useState } from 'react';

interface UnitSwitchProps {
    unit: string;
    onUnitChange: (newUnit: string) => void;
    unitType: string;
}

const UnitSwitcher: React.FC<UnitSwitchProps> = ({
    unit,
    onUnitChange,
    unitType,
}) => {
    const units = (unitType: string) => {
        if (unitType === 'temperature') {
            return {
                text: 'Temperature',
                val1: 'C',
                val2: 'F',
            };
        } else if (unitType === 'speed') {
            return {
                text: 'Speed',
                val1: 'mp/h',
                val2: 'kp/h',
            };
        } else if (unitType === 'measurements') {
            return {
                text: 'Measurements',
                val1: 'mm',
                val2: 'in',
            };
        }
    };

    const [activeVal, setActiveVal] = useState(unit);

    const handleChange = () => {
        const newUnit =
            unit === units(unitType)?.val1
                ? units(unitType)?.val2
                : units(unitType)?.val1;
        if (newUnit) {
            onUnitChange(newUnit);
            setActiveVal(newUnit);
        }
    };

    return (
        <>
            <div className=' flex justify-between items-center text-white dark:text-white'>
                <small className='mr-2 hidden lg:block dark:text-white/50 text-neutral-midGrey'>
                    {units(unitType)?.text}
                </small>
                <div className='flex bg-neutral-midGrey rounded-lg relative '>
                    <input
                        type='radio'
                        onChange={handleChange}
                        name={unitType}
                        value={units(unitType)?.val1}
                        id={units(unitType)?.val1}
                        className='hidden switch-input'
                    />
                    <label
                        htmlFor={units(unitType)?.val1}
                        className='flex justify-center items-center text-xs w-12 h-6 cursor-pointer z-20'
                    >
                        {units(unitType)?.val1}
                    </label>
                    <input
                        type='radio'
                        onChange={handleChange}
                        name={unitType}
                        value={units(unitType)?.val2}
                        id={units(unitType)?.val2}
                        className='hidden switch-input'
                    />
                    <label
                        htmlFor={units(unitType)?.val2}
                        className='flex justify-center items-center text-xs w-12 h-6 cursor-pointer z-20 switch-label-b'
                    >
                        {units(unitType)?.val2}
                    </label>
                    <div
                        className={`${
                            activeVal === units(unitType)?.val2
                                ? 'rounded-r-lg left-12'
                                : 'rounded-l-lg left-0'
                        } absolute top-0 transform transition-all ease-in-out duration-150 bg-primary w-12 h-6 z-10 switch-selection`}
                    ></div>
                </div>
            </div>
        </>
    );
};

export default UnitSwitcher;
