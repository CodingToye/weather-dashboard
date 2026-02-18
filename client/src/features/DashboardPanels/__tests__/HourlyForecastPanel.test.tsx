import {render, screen} from "@testing-library/react";

import HourlyForecastPanel from "../ForecastPanels/HourlyForecastPanel";
import {Forecast} from "../../../types/types";

const mockForecast = {
  forecastday: [
    {
      hour: [
        {
          time: "2024-04-08 00:00",
          temp_c: 10.5,
          temp_f: 50.9,
          condition: {
            text: "windy",
            icon: "//cdn.weatherapi.com/weather/64x64/night/122.png",
          },
        },
      ],
    },
  ],
} as Forecast; // Use type assertion here

const emptyHourlyForecast = {
  forecastday: [
    {
      hour: [], // No hourly data
    },
  ],
} as Forecast;

describe("HourlyForecastPanel", () => {
  const unit = "C";
  const mockedLocation = {
    name: "New York",
    region: "New York",
    country: "United States of America",
    localtime: "2024-04-08 10:53",
  };

  const renderPanel = () =>
    render(
      <HourlyForecastPanel
        forecast={mockForecast}
        unit={unit}
        location={mockedLocation}
      />
    );

  test("renders component", () => {
    renderPanel();
    const hourlyForecastPanel = screen.getByTestId(
      "hourly-forecast-panel-test"
    );
    expect(hourlyForecastPanel).toBeInTheDocument();
  });

  test("no hourly data should not render component", () => {
    render(
      <HourlyForecastPanel
        forecast={emptyHourlyForecast}
        unit={unit}
        location={mockedLocation}
      />
    );
    expect(
      screen.getByText(/No hourly forecast available for this day/)
    ).toBeInTheDocument();
  });
});
