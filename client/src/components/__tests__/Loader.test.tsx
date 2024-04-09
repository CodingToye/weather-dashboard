import React from "react";
import {render, screen} from "@testing-library/react";

import Loader from "../Loader";

describe("Loader", () => {
  const loaderColor = "#f2651d";
  const message = "Loading data...";

  test("renders component", () => {
    const {container} = render(
      <Loader loaderColor={loaderColor} message={message} />
    );
    const loaderSpans = Array.from(
      container.querySelectorAll("span span")
    ) as HTMLElement[];

    const hasColorStyle = loaderSpans.some(
      (span) =>
        span.style.borderColor === loaderColor ||
        span.style.backgroundColor === loaderColor // Adjust based on actual style usage
    );
    expect(hasColorStyle).toBeTruthy();
  });

  test("renders with default props", () => {
    render(<Loader />);
    const defaultMessage = screen.getByText("Loading...");
    expect(defaultMessage).toBeInTheDocument();
  });
});
