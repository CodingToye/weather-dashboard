import {render, screen} from "@testing-library/react";

import Badge from "../Badge";

describe("Badge", () => {
  const children = "Example Badge";
  const ariaLabel = "test badge";

  test("renders with default props", () => {
    render(
      <Badge ariaLabel={ariaLabel} active>
        {children}
      </Badge>
    );
    const badge = screen.getByText(children);
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveAttribute("aria-label", ariaLabel);
    // Check for default classes applied
    expect(badge.className).toMatch(/bg-primary/);
    expect(badge.className).toMatch(/text-white/);
  });

  test("renders inactive state correctly", () => {
    render(<Badge ariaLabel={ariaLabel}>{children}</Badge>);
    const badge = screen.getByText(children);
    expect(badge.className).toMatch(/opacity-10/);
  });

  test("renders with default ariaLabel attribute when not provided", () => {
    render(<Badge>{children}</Badge>);
    const badge = screen.getByText(children);
    expect(badge).toHaveAttribute("aria-label", "Badge");
  });
});
