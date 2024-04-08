// src/components/CustomRadio.tsx

/**
 * CustomRadio Component
 * Renders a custom radio input element
 *
 * @component
 * @example
 * return (
 *  <CustomRadio
        onChange={handleChange}
        name={unitType}
        value={unitConfig?.val1}
        id={`radio-${unitConfig?.val1}`}
        classes="hidden switch-input"
    />
 * )
 */

import React from "react";

/**
 * Properties for the CustomRadio Component
 *
 * Defines the props accepted by the CustomRadio component to customise its appearance.
 *
 * @interface
 */

export interface CustomRadioProps {
  /** function that handles the onChange */
  onChange: () => void;
  /** name of radio element */
  name: string;
  /** value of radio element */
  value: string | undefined;
  /** id of radio element */
  id: string | undefined;
  /** custom classes */
  classes: string;
}

const CustomRadio: React.FC<CustomRadioProps> = ({
  onChange,
  name,
  value,
  id,
  classes,
}) => {
  return (
    <>
      <input
        type="radio"
        onChange={onChange}
        name={name}
        value={value}
        id={id}
        className={classes}
      />
      <label
        htmlFor={id}
        className="flex justify-center items-center text-xs w-12 h-6 cursor-pointer z-20"
      >
        {value}
      </label>
    </>
  );
};

export default CustomRadio;
