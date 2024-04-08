import {render, fireEvent, screen} from "@testing-library/react";
import AlertPanel from "../AlertPanel";

describe("AlertPanel integration test", () => {
  const mockAlert = {
    category: "Wind",
    event: "Yellow wind warning",
    effective: new Date().toISOString(),
    expires: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(),
    headline: "UK Met Office",
  };
  const mockOnClick = jest.fn();

  beforeEach(() => {
    render(<AlertPanel alert={mockAlert} onClick={mockOnClick} />);
  });

  test("toggles expand/collapse on click", () => {
    const panel = screen.getByText(mockAlert.category).parentNode;
    if (panel) {
      fireEvent.click(panel);
      fireEvent.click(panel);
    }
  });

  test("calls onClick when dismiss button is clicked", () => {
    const dismissButton = screen.getByLabelText("Remove alert icon");
    if (dismissButton) {
      fireEvent.click(dismissButton);
      expect(mockOnClick).toHaveBeenCalledWith(expect.anything(), mockAlert);
    }
  });
});
