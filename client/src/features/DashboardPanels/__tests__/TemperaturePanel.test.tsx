import {screen} from "@testing-library/react";

import {render} from "../../../utils/test.utils";
import TemperaturePanel from "../TemperaturePanel";

describe("TemperaturePanel", () => {
  const mockForecastHourData = [
    {
      time: "2023-04-10 06:00",
      temp_c: 8,
      temp_f: 46,
      wind_mph: 10, // Added wind_mph
      wind_kph: 16, // Added wind_kph
      condition: {
        icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
        text: "Partly cloudy",
      },
    },
    {
      time: "2023-04-10 12:00",
      temp_c: 14,
      temp_f: 57,
      wind_mph: 5, // Added wind_mph
      wind_kph: 8, // Added wind_kph
      condition: {
        icon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
        text: "Sunny",
      },
    },
    // Include additional mock data objects as necessary
  ];

  const tempUnit = "C";

  const renderPanel = () =>
    render(
      <TemperaturePanel unit={tempUnit} forecastHour={mockForecastHourData} />
    );

  test("renders component", () => {
    renderPanel();
    const temperaturePanel = screen.getByTestId("temperature-panel-test");
    expect(temperaturePanel).toBeInTheDocument();
  });
});
