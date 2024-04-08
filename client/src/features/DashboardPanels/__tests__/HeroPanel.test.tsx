import {screen} from "@testing-library/react";
import {render} from "../../../utils/test.utils";
import HeroPanel from "../HeroPanel";

describe("HeroPanel", () => {
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

  const searchedLocation = {
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
      name: "New York",
      region: "New York",
      country: "United States of America",
    },
  };
  const tempUnit = "C";

  const renderPanel = () =>
    render(
      <HeroPanel
        searchedLocation={searchedLocation}
        tempUnit={tempUnit}
        forecastHour={mockForecastHourData}
      />
    );

  beforeEach(() => {
    renderPanel();
  });

  test("component renders", () => {
    const heroPanel = screen.getByTestId("hero-panel-test");
    expect(heroPanel).toBeInTheDocument();
  });

  test.each(["C", "F"])("renders correctly with tempUnit %s", (tempUnit) => {
    const matchingElements = screen.getAllByText(new RegExp(`${tempUnit}`));
    expect(matchingElements.length).toBeGreaterThan(0);
  });
});
