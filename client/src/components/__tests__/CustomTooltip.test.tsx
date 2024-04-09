import React from "react";
import {render, screen} from "@testing-library/react";

import CustomTooltip from "../CustomTooltip";

describe("CustomTooltip", () => {
  const mockPayload = [{value: 10}];
  const category = "Wind";
  const label = "Speed";
  const unit = "kmh";

  test("renders with full props", () => {
    render(
      <CustomTooltip
        payload={mockPayload}
        category={category}
        label={label}
        unit={unit}
      />
    );
    const tooltipText = screen.getByText(`${category} ${label}: 10 ${unit}`);
    expect(tooltipText).toBeInTheDocument();
  });

  test("renders without category", () => {
    render(<CustomTooltip payload={mockPayload} label={label} unit={unit} />);
    const tooltipText = screen.getByText(`${label}: 10 ${unit}`);
    expect(tooltipText).toBeInTheDocument();
  });

  test("renders without label", () => {
    render(
      <CustomTooltip payload={mockPayload} category={category} unit={unit} />
    );
    const tooltipText = screen.getByText(`${category} 10 ${unit}`);
    expect(tooltipText).toBeInTheDocument();
  });

  test("renders without unit", () => {
    render(
      <CustomTooltip payload={mockPayload} category={category} label={label} />
    );
    const tooltipText = screen.getByText(`${category} ${label}: 10`);
    expect(tooltipText).toBeInTheDocument();
  });

  test("renders 'N/A' when payload is undefined", () => {
    render(
      <CustomTooltip
        payload={[{value: undefined}]}
        category={category}
        label={label}
      />
    );
    const tooltipText = screen.getByText(`${category} ${label}: N/A`);
    expect(tooltipText).toBeInTheDocument();
  });

  test("does not render when payload is empty", () => {
    const {container} = render(
      <CustomTooltip
        payload={[]}
        category={category}
        label={label}
        unit={unit}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  test("does not render when payload is not provided", () => {
    const {container} = render(
      <CustomTooltip category={category} label={label} unit={unit} />
    );
    expect(container.firstChild).toBeNull();
  });
});

describe("CustomTooltip with formatValue function", () => {
  const category = "Wind";
  const label = "Speed";
  const unit = "mph";

  test("displays string payload value as is", () => {
    const payload = [{value: "Ten"}];
    render(
      <CustomTooltip
        payload={payload}
        label={label}
        category={category}
        unit={unit}
      />
    );
    expect(screen.getByText(`${category} ${label}: Ten ${unit}`));
  });
});
