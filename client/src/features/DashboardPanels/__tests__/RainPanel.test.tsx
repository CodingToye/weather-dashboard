import {screen} from "@testing-library/react";

import {render} from "../../../utils/test.utils";
import RainPanel from "../RainPanel";
import {Forecast} from "../../../types/types";

describe("RainPanel", () => {
  const mockForecast: Forecast = {
    forecastday: [
      {
        day: {
          totalprecip_mm: 3,
          totalprecip_in: 1,
          daily_chance_of_rain: 1,
        },
      },
    ],
  } as Forecast;

  const measurementUnit = "mm";

  const renderPanel = () => {
    render(
      <RainPanel forecast={mockForecast} measurementUnit={measurementUnit} />
    );
  };

  beforeEach(() => {
    renderPanel();
  });

  test("renders component", () => {
    const rainPanel = screen.getByTestId("rain-panel-test");
    expect(rainPanel).toBeInTheDocument();
  });

  test.each(["mm", "in"])(
    "renders correctly with measurementUnit %s",
    (measurementUnit) => {
      const matchingElements = screen.getAllByText(
        new RegExp(`${measurementUnit}`)
      );
      expect(matchingElements.length).toBeGreaterThan(0);
    }
  );
});
