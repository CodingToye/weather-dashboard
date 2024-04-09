import {screen} from "@testing-library/react";

import {render} from "../../../utils/test.utils";
import CloudPanel from "../CloudPanel";

describe("CloudPanel", () => {
  const searchedLocation = {
    current: {
      cloud: 70,
    },
  };

  const renderPanel = () => {
    render(<CloudPanel current={searchedLocation.current} />);
  };

  beforeEach(() => {
    renderPanel();
  });

  test("renders component", () => {
    const cloudPanel = screen.getByTestId("cloud-panel-test");
    expect(cloudPanel).toBeInTheDocument();
  });
});
