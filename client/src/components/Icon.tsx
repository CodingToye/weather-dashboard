// src/components/Icon.tsx

/**
 * Icon Component
 * Display an icon from the Material Symbols Outlined library
 * Optionally, it can handle onClick events, and extra classes
 *
 * @component
 * @example
 * const handleClick = () => { console.log('icon clicked')};
 * return (
 *  <Icon iconName="favorite" extraClasses="fizz buzz" onClick={handleClick} ariaLabel="Favorite icon" />
 * )
 */

import React from "react";

/** Properties for the Icon component
 *
 * Defines the props accepted by the Icon component.
 *
 * @interface
 */

export interface IconProps {
  /**
   * Taken from the Google fonts library - https://fonts.google.com/icons
   * 'favorite' is for heart icon, 'check_circle' is for Check Circle
   */
  iconName: string;
  /** Additional CSS classes for custom styling. Can be used to apply utility classes or custom styles. */
  extraClasses?: string;
  /**
   * Function to handle click events on the icon.
   * @param event - The mouse event triggered on icon click.
   */
  onClick?: (event: React.MouseEvent<HTMLSpanElement>) => void;
  // Adds an accessibility label to the component
  ariaLabel?: string;
}

const Icon: React.FC<IconProps> = ({
  iconName,
  extraClasses = "",
  onClick,
  ariaLabel = "Icon",
}) => {
  return (
    <span
      className={`material-symbols-rounded ${extraClasses}`}
      onClick={onClick}
      role="img"
      aria-label={ariaLabel}
    >
      {iconName}
    </span>
  );
};

export default Icon;
