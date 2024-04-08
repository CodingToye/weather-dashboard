import {render, fireEvent, screen} from "@testing-library/react";
import AlertsPanel from "../AlertsPanel";

describe("AlertsPanel integration test", () => {
  const mockAlerts = {
    alert: [
      {
        category: "Wind",
        event: "Yellow wind warning",
        effective: new Date().toISOString(),
        expires: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(),
        headline: "UK Met Office",
      },
      {
        category: "Wind",
        event: "Yellow wind warning",
        effective: new Date().toISOString(),
        expires: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(),
        headline: "UK Met Office",
      },
    ],
  };

  test("renders component with alerts", () => {
    render(<AlertsPanel weatherAlerts={mockAlerts} />);
    const alertHeadlines = screen.getAllByText(/UK Met Office/);
    expect(alertHeadlines.length).toBe(2);
  });

  test("handleRemove function removes an alert", () => {
    render(<AlertsPanel weatherAlerts={mockAlerts} />);

    const removeButtons = screen.getAllByRole("button", {
      name: "Remove alert icon",
    });
    expect(removeButtons.length).toBe(2);

    fireEvent.click(removeButtons[0]);

    const remainingAlerts = screen.getAllByText(/UK Met Office/);
    expect(remainingAlerts.length).toBe(1);
  });

  test("handleRestore function restores removed alerts", () => {
    render(<AlertsPanel weatherAlerts={mockAlerts} />);

    const removeButtons = screen.getAllByRole("button", {
      name: "Remove alert icon",
    });
    expect(removeButtons.length).toBe(2);
    fireEvent.click(removeButtons[0]);

    const restoreButton = screen.getByRole("button", {
      name: "Weather Alerts refresh icon",
    });
    fireEvent.click(restoreButton);

    const alertHeadlines = screen.getAllByText(/UK Met Office/);
    expect(alertHeadlines.length).toBe(2);
  });
});
