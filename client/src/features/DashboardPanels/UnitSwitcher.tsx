import React from 'react';

interface UnitSwitchProps {
    unit: string;
    onUnitChange: (newUnit: string) => void;
}

const UnitSwitcher: React.FC<UnitSwitchProps> = ({ unit, onUnitChange }) => {
    const handleChange = () => {
        const newUnit = unit === 'C' ? 'F' : 'C';
        onUnitChange(newUnit);
    };

    return (
        <>
            <div className='flex items-center'>
                <small className='mr-2'>Temperature</small>
                <label className='c-toggle flex items-center w-max relative cursor-pointer select-none'>
                    <input
                        type='checkbox'
                        onChange={handleChange}
                        className='appearance-none cursor-pointer rounded-full w-16 h-6 bg-color1 transition-colors'
                        checked={unit === 'F'}
                    />
                    <div className='absolute w-full flex flex-row-reverse justify-between'>
                        <span className='px-2 text-xs  text-white z-10'>
                            F&deg;
                        </span>
                        <span className='px-2 text-xs  text-white z-10'>
                            C&deg;
                        </span>
                    </div>
                    <span className='w-7 h-6 right-9 absolute rounded-full transform transition-transform bg-color6' />
                </label>
            </div>
        </>
    );
};

export default UnitSwitcher;
