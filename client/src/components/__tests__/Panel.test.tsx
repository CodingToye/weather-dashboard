import React from "react";
import {render, screen} from "@testing-library/react";

import Panel from "../Panel";

describe("Panel", () => {
  const children = "Some panel content...";
  test("component renders with default props", () => {
    render(<Panel>{children}</Panel>);
    const panel = screen.getByText(children);
    expect(panel).toBeInTheDocument();
  });
});
