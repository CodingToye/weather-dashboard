import {screen} from "@testing-library/react";

import {render} from "../../../utils/test.utils";
import UVPanel from "../UVPanel";
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

const searchedLocation = {
  current: {
    uv: 3,
  },
};
describe("UVPanel", () => {
  const renderPanel = () => {
    render(
      <UVPanel forecast={mockForecast} current={searchedLocation.current} />
    );
  };
  test("renders component", () => {
    renderPanel();
    const uvPanel = screen.getByTestId("uv-panel-test");
    expect(uvPanel).toBeInTheDocument();
  });
});
