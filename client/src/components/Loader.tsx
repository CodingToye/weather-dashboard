// src/components/Loader.tsx

/**
 * Loader Component
 * Displays a loading animation with customisable color and text message.
 * It uses an external component - https://github.com/davidhu2000/react-spinners
 *
 * @component
 * @example

 * return (
 *  <Loader loaderColor="#f2651d" message="Loading weather data..." />
 * );
 */

import {RingLoader} from "react-spinners";

/**
 * Properties for the Loader Component
 *
 * Defines the props accepted by the Loader component to customise its appearance and message.
 *
 * @interface
 */

export interface LoaderProps {
  /** takes any color format */
  loaderColor?: string;
  /** string to display a loading message */
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({
  loaderColor = "#f2651d",
  message = "Loading...",
}) => {
  return (
    <div
      className="flex justify-center items-center gap-4"
      data-testid="loader-test"
    >
      <RingLoader color={loaderColor} />
      <p className="text-2xl">{message}</p>
    </div>
  );
};

export default Loader;
