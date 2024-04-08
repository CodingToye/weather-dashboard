/** Properties for the cloudLevels function
 *
 * Defines the props accepted by the cloudLevels function to return useful data.
 *
 * @interface
 */

export interface CloudLevelProps {
  /** text description of current cloud coverage status */
  text: string;
  /** suitable icon to illustrate the current cloud coverage status */
  icon: string;
}

/** Properties for the humidityLevels function
 *
 * Defines the props accepted by the humidityLevels function to return useful data.
 *
 * @interface
 */

export interface HumidityLevelProps {
  /** text description of current humidity levels status */
  text: string;
  /** suitable icon to illustrate the current humidity levels status */
  icon: string;
}

/**
 * Determines cloud coverage level based on the provided cloud percentage.
 *
 * Provides textual descriptions and icon names for different ranges of cloud coverage,
 * aiding in the visual representation of cloud data.
 *
 * @param {number} x - The percentage of cloud coverage.
 * @returns {object} An object containing the textual description (`text`) and the icon name (`icon`)
 * corresponding to the cloud coverage level.
 */
export function cloudLevels(x: number): CloudLevelProps {
  if (x === 0) {
    return {
      text: "sunny day",
      icon: "sunny",
    };
  } else if (x > 0 && x <= 25) {
    return {
      text: "patchy clouds",
      icon: "partly_cloudy_day",
    };
  } else if (x > 25 && x <= 75) {
    return {
      text: "bit murky",
      icon: "cloud",
    };
  } else {
    return {
      text: "skies are grey",
      icon: "filter_drama",
    };
  }
}

export function humidityLevels(x: number): HumidityLevelProps {
  if (x <= 55) {
    return {
      icon: "humidity_low",
      text: "low",
    };
  } else if (x > 55 && x <= 65) {
    return {
      icon: "humidity_mid",
      text: "mid",
    };
  } else {
    return {
      icon: "humidity_high",
      text: "high",
    };
  }
}
