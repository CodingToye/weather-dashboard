// src/components/UVIndexBadges.tsx

/**
 * UVIndexBadges Component
 * Displays all badges by looping over a constant array.
 *
 * @component
 * @example
 * return (
 *  {UVIndexBadges({uvIndex})}
 * );
 */

import React from "react";

import Badge from "./Badge";

/**
 * Properties for the UVIndexBadges Component
 *
 * Defines the props accepted by the UVIndexBadges component to customise its appearance.
 *
 * @interface
 */

export interface UVIndexCategory {
  /** minimum UVIndex number */
  min: number;
  /** maximum UVIndex number */
  max: number;
  /** label to display inside badge */
  label: string;
  /** badge background color */
  bgColor: string;
  /** badge text color */
  textColor: string;
}

export interface UVIndexBadgesProps {
  /** UVIndex number */
  uvIndex: number;
}

const UV_INDEX_CATEGORIES: UVIndexCategory[] = [
  {min: 0, max: 2, label: "low", bgColor: "uv-low", textColor: "uv-lowDark"},
  {
    min: 3,
    max: 5,
    label: "moderate",
    bgColor: "uv-moderate",
    textColor: "uv-moderateDark",
  },
  {min: 6, max: 7, label: "high", bgColor: "uv-high", textColor: "uv-highDark"},
  {
    min: 8,
    max: 10,
    label: "very high",
    bgColor: "uv-veryHigh",
    textColor: "uv-veryHighDark",
  },
  {
    min: 11,
    max: 99,
    label: "extreme",
    bgColor: "uv-extreme",
    textColor: "uv-extremeDark",
  },
];

export const UVIndexBadges = React.memo(({uvIndex}: UVIndexBadgesProps) => {
  return (
    <>
      {UV_INDEX_CATEGORIES.map((category) => (
        <Badge
          key={category.label}
          bgColor={`bg-${category.bgColor}`}
          textColor={category.textColor}
          active={uvIndex >= category.min && uvIndex <= category.max}
          ariaLabel={category.label}
        >
          {category.label}
        </Badge>
      ))}
    </>
  );
});

// Todo - Write a unit test
