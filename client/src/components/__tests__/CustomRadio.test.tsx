import React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import CustomRadio from "../CustomRadio";

describe("CustomRadio", () => {
  const handleChange = jest.fn();
  const unitType = "temperature";
  const unitVal = "C";
  const radioId = `radio-${unitVal}`;

  beforeEach(() => {
    render(
      <CustomRadio
        onChange={handleChange}
        name={unitType}
        value={unitVal}
        id={radioId}
        classes="hidden switch-input"
      />
    );
  });

  test("renders radio input with correct properties", () => {
    const radioInput = screen.getByRole("radio");
    expect(radioInput).toHaveAttribute("name", unitType);
    expect(radioInput).toHaveAttribute("value", unitVal);
    expect(radioInput).toHaveAttribute("id", radioId);
    // Since class name "hidden" is used, checking for visibility might not be meaningful,
    // but we can still check for the presence of custom class
    expect(radioInput).toHaveClass("hidden switch-input");
  });

  test("label is associated with the radio input", () => {
    const label = screen.getByText(unitVal);
    // This checks that the label's 'for' attribute matches the radio input's id
    expect(label).toHaveAttribute("for", radioId);
  });

  test("calls onChange handler when clicked", () => {
    const radioInput = screen.getByRole("radio");
    fireEvent.click(radioInput);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
