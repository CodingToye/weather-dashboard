import React from "react";
import {screen} from "@testing-library/react";
import {render} from "../../../utils/test.utils";
import HumidityPanel from "../HumidityPanel";

describe("HumidityPanel", () => {
  const humidity = 3;

  const renderPanel = () => {
    render(<HumidityPanel humidity={humidity} />);
  };

  beforeEach(() => {
    renderPanel();
  });

  test("renders component", () => {
    const humidityPanel = screen.getByTestId("humidity-panel-test");
    expect(humidityPanel).toBeInTheDocument();
  });
});
