/**
 * A collection of weather alerts.
 * This interface is designed to hold an array of `Alert` objects,
 * each representing specific weather alert information.
 */
export interface Alerts {
  alert: Alert[] | [];
}

/**
 * Represents Weather Alert information
 */
export interface Alert {
  headline: string;
  event: string;
  category: string;
  desc?: string;
  effective: string;
  expires: string;
  certainty?: string;
}
