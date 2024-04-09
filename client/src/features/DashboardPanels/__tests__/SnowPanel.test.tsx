jest.mock("../../../utils/units.utils", () => ({
  cmToInches: jest.fn(),
  cmToMm: jest.fn(),
}));

// Import after mocking
import {screen} from "@testing-library/react";

import {cmToInches, cmToMm} from "../../../utils/units.utils";
import {render} from "../../../utils/test.utils";
import SnowPanel from "../SnowPanel";
import {Forecast} from "../../../types/types";

describe("SnowPanel", () => {
  const mockForecast: Forecast = {
    forecastday: [
      {
        day: {
          totalsnow_cm: 3,
          daily_chance_of_snow: 1,
        },
      },
    ],
  } as Forecast;

  const measurementUnit = "mm";

  const renderPanel = () => {
    render(
      <SnowPanel forecast={mockForecast} measurementUnit={measurementUnit} />
    );
  };

  beforeEach(() => {
    (cmToInches as jest.Mock).mockImplementation((val) => val / 2.54);
    (cmToMm as jest.Mock).mockImplementation((val) => val * 10);
  });

  test("renders component", () => {
    renderPanel();
    const rainPanel = screen.getByTestId("snow-panel-test");
    expect(rainPanel).toBeInTheDocument();
  });

  test.each([
    ["mm", "300.00"], // Expected mm value
    ["in", "2.36"], // Expected inches value
  ])("renders correctly with measurementUnit %s", (unit, expectedValue) => {
    if (unit === "in") {
      (cmToInches as jest.Mock).mockReturnValue(parseFloat(expectedValue));
    } else {
      (cmToMm as jest.Mock).mockReturnValue(parseFloat(expectedValue));
    }

    render(<SnowPanel forecast={mockForecast} measurementUnit={unit} />);
    const formattedExpectedText = `${expectedValue} ${unit}`;
    expect(screen.getByText(formattedExpectedText)).toBeInTheDocument();
  });
});
