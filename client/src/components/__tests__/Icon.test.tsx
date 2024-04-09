import React from "react";
import {render, screen} from "@testing-library/react";

import Icon from "../Icon";

describe("Icon", () => {
  const iconName = "favorite";
  const ariaLabel = "Favorite icon";
  const handleClick = jest.fn();

  test("renders with default props", () => {
    render(
      <Icon iconName={iconName} ariaLabel={ariaLabel} onClick={handleClick} />
    );
    const icon = screen.getByText(iconName);
    expect(icon).toBeInTheDocument();
  });

  test("renders with default ariaLabel attribute when not provided", () => {
    render(<Icon iconName={iconName} onClick={handleClick} />);
    const icon = screen.getByText(iconName);
    expect(icon).toHaveAttribute("aria-label", "Icon");
  });
});
