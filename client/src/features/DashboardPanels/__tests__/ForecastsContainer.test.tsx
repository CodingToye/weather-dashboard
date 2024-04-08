import {render, screen} from "@testing-library/react";
import ForecastsContainer from "../ForecastsContainer";
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

const mockAlerts = {
  alert: [
    {
      category: "Wind",
      event: "Yellow wind warning",
      effective: new Date().toISOString(),
      expires: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(),
      headline: "UK Met Office",
    },
    {
      category: "Wind",
      event: "Yellow wind warning",
      effective: new Date().toISOString(),
      expires: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(),
      headline: "UK Met Office",
    },
  ],
};

const mockSearchedLocation = {
  current: {
    temp_c: 20,
    temp_f: 40,
    feelslike_c: 22,
    feelslike_f: 44,
    condition: {
      icon: "",
      text: "Condition text",
    },
  },
  location: {
    name: "London",
    region: "City of London, Greater London",
    country: "United Kingdom",
    localtime: "2024-04-08 12:35",
  },
};
const unit = "C";

describe("ForecastsContainer", () => {
  const renderPanel = () =>
    render(
      <ForecastsContainer
        forecast={mockForecast}
        unit={unit}
        alerts={mockAlerts}
        searchedLocation={mockSearchedLocation}
      />
    );

  beforeEach(() => {
    renderPanel();
  });
  test("renders AlertsPanel when there are alerts", () => {
    const alertsPanel = screen.getByTestId("alerts-panel-test");
    expect(alertsPanel).toBeInTheDocument();
  });

  test("renders HourlyForecastPanel when there is a searchedLocation", () => {
    const hourlyForecastPanel = screen.getByTestId(
      "hourly-forecast-panel-test"
    );
    expect(hourlyForecastPanel).toBeInTheDocument();
  });

  test("renders WeeklyForecastPanel when there is a forecast", () => {
    const weeklyForecastPanel = screen.getByTestId(
      "weekly-forecast-panel-test"
    );
    expect(weeklyForecastPanel).toBeInTheDocument();
  });
});
