import {render, screen} from "@testing-library/react";

import WeeklyForecastPanel from "../WeeklyForecastPanel";
import {Forecast} from "../../../types/types";

describe("WeeklyForecastPanel", () => {
  const mockForecast = {
    forecastday: [
      {
        day: {
          mintemp_c: 0,
          maxtemp_c: 0,
          mintemp_f: 0,
          maxtemp_f: 0,
          avgtemp_c: 0,
          avgtemp_f: 0,
        },
      },
    ],
  } as Forecast; // Use type assertion here
  const unit = "C";

  const renderPanel = () => {
    render(<WeeklyForecastPanel forecast={mockForecast} unit={unit} />);
  };
  test("renders component", () => {
    renderPanel();
    const weeklyForecastPanel = screen.getByTestId(
      "weekly-forecast-panel-test"
    );
    expect(weeklyForecastPanel).toBeInTheDocument();
  });
});
